from xblock.core import XBlock
from xblock.scorable import ScorableXBlockMixin, Score
from xblock.fields import String, Scope, Integer, List, Dict
from xblock.utils.studio_editable import StudioEditableXBlockMixin
from web_fragments.fragment import Fragment
import json
import requests
from datetime import datetime

try:
    from xblock.utils.resources import ResourceLoader
except ModuleNotFoundError:
    # For backward compatibility with releases older than Quince.
    from xblockutils.resources import ResourceLoader

class ViewMixin:
  loader = ResourceLoader(__name__)
  
  static_css = [
    'public/css/cm.css',
    'public/css/index.css',
  ]
  
  static_js = [
    'public/js/cm.js',
    'public/js/cm-al.js',
    'public/js/cm-py.js',
    'public/js/index.js',
  ]
  
  def getFragment(self) -> Fragment:
    frag = Fragment()
    
    frag.add_content(
      self.loader.render_django_template(
        template_path='/public/index.html',
        context={
          'self': self,
          'memory': self.memoryLimitBytes / (1024 * 1024),
          'answers': [
            { 
              **answer, 
              "index": iAnswer + 1,
              "time": round(answer['time'] * 1000),
              "formattedDate": datetime.fromisoformat(answer['date']).strftime("%d.%m.%y, %H:%M:%S")
            } for iAnswer, answer in enumerate(self.answers)]
        }
      )
    )

    for cssFilePath in self.static_css:
      frag.add_css(self.loader.load_unicode(cssFilePath))
      
    for jsFilePath in self.static_js:
      frag.add_javascript(self.loader.load_unicode(jsFilePath))
    
    frag.initialize_js('CodeRunnerXBlock')
    return frag
  
  def student_view(self, context=None) -> Fragment:
    fragment = self.getFragment()
    
    return fragment

class DataMixin(StudioEditableXBlockMixin, ScorableXBlockMixin, XBlock):
  title = String(default='Задание', scope=Scope.content, display_name='Заголовок')
  description = String(default='Описание', scope=Scope.content, display_name='Описание')
  input = String(default='Первая строка входа содержит числа A и B ( -2*10^9 ≤ A, B≤ 2*10^9), разделенные пробелом', scope=Scope.content, display_name='Описание данных для входа')
  output = String(default='В единственной строке выхода выведите сумму чисел A+B', scope=Scope.content, display_name='Описание данных для выхода')
  code = String(default='print(input())', scope=Scope.user_state)
  tests = String(scope=Scope.content, default='[{"stdin":"1","stdout":"1\\n"},{"stdin":"10","stdout":"10\\n"}]', display_name='Тесты')
  maxAttempts = Integer(scope=Scope.content, default=0, min=0, display_name='Максимальное количество попыток')
  attempts = Integer(scope=Scope.user_state, default=0, min=0)
  checker_url = String(scope=Scope.content, default='http://localhost:63342/', display_name='Ссылка на чекер')
  timeoutInSecond = Integer(scope=Scope.content, default=1, min=1, max=29.9, display_name='Ограничение по времени')
  memoryLimitBytes = Integer(scope=Scope.content, default=6291456, min=6291456, max=268435456, display_name='Ограничение по памяти')
  answers = List(scope=Scope.user_state)
  score = Integer(scope=Scope.user_state, default=0, min=0)
  maxScore = Integer(scope=Scope.content, default=50, min=0, display_name='Баллы')
  editable_fields = ('title', 'description', 'input', 'output', 'tests', 'maxAttempts', 'checker_url', 'timeoutInSecond', 'memoryLimitBytes', 'maxScore')
  
  def getScore(self, index):
    tests_count = len(json.loads(self.tests))
    return (index / tests_count) * self.maxScore
  
  def updateAnswers(self, answer, index: int, date: str, isLast: bool | None=None) -> bool:
    if (answer is None or 'error' in answer or 'result' not in answer):
      return True
    
    time = float(answer['result']['duration'][0:len(answer['result']['duration'])-1])
    
    if (isLast == True):
      self.answers.append({
        "date": date,
        "result": "OK",
        "score": self.maxScore,
        "test": index + 1,
        "time": time
      })
      self.rescore(False)
      return True
    
    if (answer['result']['status'] != 'STATUS_SUCCESS'):
      self.answers.append({
        "date": date,
        "result": "WRONG",
        "score": self.getScore(index),
        "test": index + 1,
        "time": time
      })
      self.rescore(False)
      return True
    
    return False
  
  @XBlock.json_handler
  def submit(self, data, suffix=''):
    self.code = data['code']
    date = datetime.now().isoformat()
    try:
      res = requests.post(
        url=f'{self.checker_url}v1/check',
        stream=True,
        json={
          "tests": json.loads(self.tests),
          "request": {
            "image": "python-coderunner:3.12.3",
            "typeTesting": "STD",
            "code": self.code,
            "timeout": f"{self.timeoutInSecond}s",
            "memoryLimitBytes": self.memoryLimitBytes,
            "fullInfoWa": True
          }
        }
      )
    except Exception as error:
      print('Request error', error)
      return self.answers
    
    lastAnswer = None
    for index, codeCheckAnswer in enumerate(res.iter_lines()):
      answer = json.loads(codeCheckAnswer)
      lastAnswer = answer
      if self.updateAnswers(answer, index, date):
        return self.answers
    else:
      self.updateAnswers(lastAnswer, len(json.loads(self.tests)) - 1, date, True)
      return self.answers
  
  # Zalupa dlya otsenki
  def rescore(self, only_if_higher):
    if not self.allows_rescore():
      raise TypeError('Rescore not allowed')

    if not self.has_submitted_answer():
      raise ValueError('Rescore not allowed (submitted)')

    new_score = self.calculate_score()
    self._publish_grade(new_score, only_if_higher)
  
  def calculate_score(self):
    lastAnswer = self.answers[-1]
    if (lastAnswer is None):
      return Score(raw_earned=0, raw_possible=self.maxScore)
    
    self.score = lastAnswer['score']
    return Score(raw_earned=self.score, raw_possible=self.maxScore)
  
  def get_score(self):
    return Score(raw_earned=self.score, raw_possible=self.maxScore)
  
  def set_score(self, score: Score):
    self.score = score.raw_earned
    
  def has_submitted_answer(self):
    return len(self.answers) > 0


class CodeRunnerXBlock(DataMixin, ScorableXBlockMixin, ViewMixin, XBlock):
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("CodeRunnerXBlock",
             """<coderunner/>
             """),
        ]

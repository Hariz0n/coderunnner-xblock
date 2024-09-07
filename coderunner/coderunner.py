from xblock.core import XBlock
from xblock.fields import String, Scope, List
from web_fragments.fragment import Fragment
from typing import NamedTuple
from json import loads

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
          'tests': loads('[]') if len('') > 0 else []
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

class TestDict(NamedTuple):
  input: str;
  output: str;

class DataMixin:
  title = String(default='Задание', scope=Scope.content)
  description = String(default='Описание', scope=Scope.content)
  input = String(default='Первая строка входа содержит числа A и B ( -2*10^9 ≤ A, B≤ 2*10^9), разделенные пробелом', scope=Scope.content)
  output = String(default='В единственной строке выхода выведите сумму чисел A+B', scope=Scope.content)
  code = String(default='def x:\n    10', scope=Scope.user_state)
  tests = List(scope=Scope.content, enforce_type=TestDict)
    
  @XBlock.json_handler
  def submit(self, data, suffix=''):
    self.code = data['code']
    return


class CodeRunnerXBlock(DataMixin, ViewMixin, XBlock):
    hasScore = True
  
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("CodeRunnerXBlock",
             """<coderunner/>
             """),
        ]

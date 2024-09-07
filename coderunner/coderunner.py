from xblock.core import XBlock
from xblock.fields import String, Scope
from web_fragments.fragment import Fragment
try:
    from xblock.utils.resources import ResourceLoader
except ModuleNotFoundError:
    # For backward compatibility with releases older than Quince.
    from xblockutils.resources import ResourceLoader

class ViewMixin:
  static_css = [
    'public/css/index.css',
  ]
  
  static_js = [
    'public/js/react.js'
  ]
  
  def getFragment(self) -> Fragment:
    frag = Fragment()
    
    frag.add_content(
      self.loader.render_django_template(
        template_path='/public/html/index.html',
        context={
          'self': self
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
  
  def author_view(self, context=None) -> Fragment:
    fragment = self.getFragment()
    
    return fragment


class DataMixin:
  title = String(default='Задание', scope=Scope.content)
  description = String(default='Описание', scope=Scope.content)
  input = String(default='Первая строка входа содержит числа A и B ( -2*10^9 ≤ A, B≤ 2*10^9), разделенные пробелом', scope=Scope.content)
  output = String(default='В единственной строке выхода выведите сумму чисел A+B', scope=Scope.content)
  code = String(default='def x:\n    10', scope=Scope.user_state)
  
  @XBlock.json_handler
  def get_data(self, data, suffix=''):
    return {
      "title": self.title,
      "description": self.description,
      "input": self.input,
      "output": self.output,
      "code": self.code,
    }
    
  @XBlock.json_handler
  def submit(self, data, suffix=''):
    self.code = data['code']
    return


class CodeRunnerXBlock(DataMixin, ViewMixin, XBlock):
    loader = ResourceLoader(__name__)

    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        return {"count": 10}


    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("CodeRunnerXBlock",
             """<coderunner/>
             """),
        ]

from xblock.core import XBlock
from xblock.fields import String, Scope

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

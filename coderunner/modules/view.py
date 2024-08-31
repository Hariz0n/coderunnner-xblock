from web_fragments.fragment import Fragment

class ViewMixin:
  static_css = [
    'public/css/roboto.css',
    'public/css/reset.css',
    'public/css/index.css',
  ]
  
  static_js = [
    'public/js/index.js',
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

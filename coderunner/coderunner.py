from xblock.core import XBlock
from xblock.fields import Integer, Scope
from .modules.view import ViewMixin
try:
    from xblock.utils.resources import ResourceLoader
except ModuleNotFoundError:
    # For backward compatibility with releases older than Quince.
    from xblockutils.resources import ResourceLoader


class CodeRunnerXBlock(ViewMixin, XBlock):
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

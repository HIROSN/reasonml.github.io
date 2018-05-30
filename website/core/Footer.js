const React = require("react");

class Footer extends React.Component {
  render() {
    return (
      <span>
        <script src={this.props.config.baseUrl + 'js/redirectBlog.js'}></script>
        <script src={this.props.config.baseUrl + 'js/pjax-api.js'}></script>
        <script dangerouslySetInnerHTML={{__html: `var Pjax = require('pjax-api').Pjax; window.foo = new Pjax({
          areas: [
            // try to use the first query.
            '.mainContainer, .docsNavContainer .toc .navWrapper',
            // fallback
            'body'
          ],
          link: '.docsNavContainer:not(.docsSliderActive) a',
          update: {
            script: false,
          }
        });
        var languagesMenuItemCopy = document.getElementById("languages-menu");
        languagesMenuItemCopy.addEventListener("click", function(e){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        });`}}></script>
      </span>
    );
  }
}

module.exports = Footer;

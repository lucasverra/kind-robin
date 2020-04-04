import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
      <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              var OneSignal = window.OneSignal || [];
                  OneSignal.push(function() {
                    OneSignal.init({
                      appId: "a67a8317-02d3-4110-858c-7bac96816938",
                    });
                    OneSignal.setEmail("a@b.com");
                    OneSignal.sendTag("toto", "titi"); 
                  });
              `,
        }}
      />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

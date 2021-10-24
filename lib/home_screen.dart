import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:webviewx/webviewx.dart';

// flutter run -d chrome --web-renderer html
// flutter build web --web-renderer html

class HomeView extends StatefulWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  _HomeViewState createState() => _HomeViewState();
}

double theta = 0.0;

class _HomeViewState extends State<HomeView> {
  late WebViewXController webViewXController;

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    webViewXController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        child: Column(
          children: [
            SizedBox(
              height: 100,
              child: Container(
                color: Colors.blue.shade100,
                child: Row(
                  children: [
                    const FlutterLogo(size: 70),
                    SizedBox(width: 5),
                    Text("Flutter\nController"),
                    SizedBox(width: 10),
                    CupertinoButton(
                      color: Colors.blue,
                      child: Text("Theta = 0.0"),
                      onPressed: () {
                        theta = 0.0;
                        webViewXController.callJsMethod("render", [theta]);
                      },
                    ),
                    Slider(
                        value: theta,
                        min: -1.5,
                        max: 1.5,
                        onChanged: (value) {
                          theta = value;
                          setState(() {});
                          webViewXController.callJsMethod("render", [theta]);
                        })
                  ],
                ),
              ),
            ),
            WebViewX(
              height: MediaQuery.of(context).size.height - 100,
              width: MediaQuery.of(context).size.width,
              initialContent: initialContent,
              initialSourceType: SourceType.html,
              onWebViewCreated: (WebViewXController wvxController) {
                webViewXController = wvxController;
                print("============DONE============");
              },
            ),
          ],
        ),
      ),
    );
  }

  final initialContent = """
    <html>

    <script id="vertex-shader" type="x-shader/x-vertex">

    attribute  vec4 vPosition;
    attribute  vec4 vColor;
    varying vec4 fColor;

    uniform mat4 modelView;
    uniform mat4 projection;

    void main() {
        fColor = vColor;
        gl_Position = projection * modelView * vPosition;
    } 
    </script>

    <script id="fragment-shader" type="x-shader/x-fragment">

    precision mediump float;
    varying vec4 fColor;

    void main() {
        gl_FragColor = fColor;
    }
    </script>

    <script type="text/javascript" src="webgl-utils.js"></script>
    <script type="text/javascript" src="ishs.js"></script>
    <script type="text/javascript" src="MV.js"></script>
    <script type="text/javascript" src="perspective.js"></script>

    <body>
    ID: 201533631 NAME: 김도균 <br>
    <canvas id="gl-canvas" width="512" height="512">
    Oops ... your browser doesn't support the HTML5 canvas element
    </canvas>
      
    <br/>

    <div>
        zNear .01
        <input id="nearSlider" type="range" min=".01" max="3" step="0.1" value="0.3" />
        3
    </div>

    <div>
        zFar 3
        <input id="farSlider" type="range" min="3" max="10" step="1" value="4" />
        10
    </div>
    <div>
        radius 0.05
        <input id="radiusSlider" type="range" min="0.05" max="10" step="0.1" value="4" />
        10
    </div>
    <div>
        theta -90
        <input id="thetaSlider" type="range" min="-90" max="90" step="1" value="0" />
        90
    </div>

    <div>
        phi -90
        <input id="phiSlider" type="range" min="-90" max="90" step="1" value="0" />
        90
    </div>

    <div>
        fov 10
        <input id="fovySlider" type="range" min="10" max="120" step="1" value="50" />
        120
    </div>

    <div>
        aspect 0.5
        <input id="aspectSlider" type="range" min="0.5" max="2" step="0.1" value="1" />
        2
    </div>

    </body>
    </html>
  """;
}

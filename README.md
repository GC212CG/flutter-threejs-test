# Flutter web & Three.js Test

- Test to Three.js working properly in Flutter web based webpage.
- It works! but, Flutter and Three.js have little bit problems
  - Flutter's layer cover the Three.js layer. This means that Flutter have priority of mouse click events when Flutter and Three.js are overlaped. 
  - To solve this problem, seperate the area for each Flutter and Three.js or change the priority when user want to click Three.js window.

### Demo

<img src="https://github.com/GC212CG/flutter-threejs-test/blob/master/references/demo.png?raw=true" width=700>

### Demo video
 - [Watch video](https://github.com/GC212CG/flutter-threejs-test/blob/master/references/demo.mp4?raw=true)
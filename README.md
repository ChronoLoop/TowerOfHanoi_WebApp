# Tower Of Hanoi

A full-stack (MERN) web app for the Tower of Hanoi game where players can create accounts, which will allow scores to be posted onto a leaderboard. The game was built in Unity3D and exported as a WebGL.

<b>Game source code:</b> <a>https://github.com/ikevinws/TowerOfHanoi</a>

<b>Website: </b> <a>https://tower-of-hanoi.up.railway.app/</a>

<img width="1438" alt="screenshot" src="images/home.png">

<h2>Installation</h2>

Setup the project and install the packages by running

```bash
npm run setup
```

Run project with command

```bash
npm run dev
```

<h2>Built with</h2>
<ul>
    <li><b>FrontEnd:</b> React.JS, Bootstrap, HTML/CSS </li>
    <li><b>Backend:</b> Node.JS, Express.JS, Passport.JS  </li>
    <li><b>Database:</b> MongoDB, Mongoose  </li>
    <li><b>Game Engine:</b> Unity3D</li>
</ul>

<h2> Features </h2>
<ul>
    <li> Sign In / Sign Up / Sign Out the user. </li>
    <li> A leaderboard that records the player's best time and the number of moves for each level</li>
</ul>

<h2> API </h2>
<h4> Users </h4>
<ul>
  <li> <b>POST</b> /api/users/signup </li>
  <li> <b>POST</b>  /api/users/signin  </li>
  <li> <b>GET</b>  /api/users/signout </li>
  <li> <b>GET</b>  /api/users/checkAuth </li>
</ul>

<h4> Levels </h4>
<ul>
  <li> <b>GET</b> /api/level/getLevels </li>
  <li> <b>GET</b> /api/level/:id </li>
  <li> <b>POST</b> /api/level/addLevel </li>
</ul>

<h2> Credits </h2>
<ul>
  <li>The button icons were obtained from <a>www.flaticon.com</a>.</li>
  <li>The sound effects were obtained from <a>www.zapsplat.com</a>.</li>
  <li>Some assets (wood texture, and skybox) were downloaded from the Unity store.</li> 
</ul>

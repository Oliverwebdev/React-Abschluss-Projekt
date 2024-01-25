import React from "react";

function Footer() {
  return (
<div className="footer-container flex justify-center flex-wrap mt-20 ml-20">
  <div className="footer-column">
    <h4 class="text-lg font-bold mb-2">Github Profiles</h4>
    <ul class="list-none p-0">
      <li><a href="https://github.com/user1" class="text-blue-500 hover:underline">User 1</a></li>
      <li><a href="https://github.com/user2" class="text-blue-500 hover:underline">User 2</a></li>
      <li><a href="https://github.com/user3" class="text-blue-500 hover:underline">User 3</a></li>
    </ul>
  </div>

  <div className="footer-column">
    <h4 class="text-lg font-bold mb-2">Styling Themes</h4>
    <ul class="list-none p-0">
      <li><a href="/theme1" class="text-blue-500 hover:underline">Theme 1</a></li>
      <li><a href="/theme2" class="text-blue-500 hover:underline">Theme 2</a></li>
      <li><a href="/theme3" class="text-blue-500 hover:underline">Theme 3</a></li>
      <li><a href="/theme4" class="text-blue-500 hover:underline">Theme 4</a></li>
    </ul>
  </div>

  <div className="footer-column">
    <h4 class="text-lg font-bold mb-2">RAWG API</h4>
    <a href="https://rawg.io" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">RAWG</a>
  </div>
</div>


  );
}

export default Footer;

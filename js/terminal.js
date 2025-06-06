const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

const commands = {
  help: `Available commands:<br>
  - help: Show this help text<br>
  - about: Learn more about this site<br>
  - ascii: Show ASCII art<br>
  - clear: Clear terminal<br>
  `,
  about: `The Binary Journal is a tech-culture fusion blog by Atharv Kale. It explores ideas at the edge of software, society, and stories.`,
  ascii: `<div class="ascii-scroll-container">
<pre class="ascii-art">
####### #     # #######    ######  ### #     #    #    ######  #     #          # ####### #     # ######  #     #    #    #       
   #    #     # #          #     #  #  ##    #   # #   #     #  #   #           # #     # #     # #     # ##    #   # #   #       
   #    #     # #          #     #  #  # #   #  #   #  #     #   # #            # #     # #     # #     # # #   #  #   #  #       
   #    ####### #####      ######   #  #  #  # #     # ######     #             # #     # #     # ######  #  #  # #     # #       
   #    #     # #          #     #  #  #   # # ####### #   #      #       #     # #     # #     # #   #   #   # # ####### #       
   #    #     # #          #     #  #  #    ## #     # #    #     #       #     # #     # #     # #    #  #    ## #     # #       
   #    #     # #######    ######  ### #     # #     # #     #    #        #####  #######  #####  #     # #     # #     # ####### 
</pre>
</div>`


};

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    const terminalBody = document.getElementById('terminal-body');

    if (command === 'clear') {
      output.textContent = '';
      input.value = '';
      return;
    }

    const response = commands[command] || `'${command}' is not recognized. Type 'help' for options.`;
    output.innerHTML += `<div class="command-line">> ${command}</div>${response}`;
    input.value = '';

    // Scroll to bottom in case content grows (no scrollbars shown though)
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

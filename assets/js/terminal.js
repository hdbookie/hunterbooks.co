/* ===========================
   Terminal Animation
   =========================== */

function typeTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    const commands = [
        { prompt: '$', text: 'whoami', delay: 100 },
        { prompt: '', text: 'hunter@ai-automation-expert', delay: 50, isOutput: true },
        { prompt: '$', text: 'make scenario --create "AI Sales Automation"', delay: 100 },
        { prompt: '', text: '✓ Workflow created: 50+ automations deployed', delay: 50, isOutput: true, isGreen: true },
        { prompt: '$', text: 'prohora.app --deploy --production', delay: 100 },
        { prompt: '', text: '✓ AI scheduling platform launched successfully', delay: 50, isOutput: true, isGreen: true },
        { prompt: '$', text: 'automation --stats', delay: 100 },
        { prompt: '', text: 'Total workflows: 50+ | Tasks automated: 10,000+ | Time saved: 90%', delay: 50, isOutput: true },
        { prompt: '$', text: 'ai-stack --list', delay: 100 },
        { prompt: '', text: 'Make.com | Claude AI | GPT-4 | LangChain | n8n | MCP Servers', delay: 50, isOutput: true, isGreen: true }
    ];
    
    let commandIndex = 0;
    
    function typeCommand() {
        if (commandIndex >= commands.length) return;
        
        const command = commands[commandIndex];
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        if (command.prompt) {
            const prompt = document.createElement('span');
            prompt.className = 'terminal-prompt';
            prompt.textContent = command.prompt;
            line.appendChild(prompt);
        }
        
        const text = document.createElement('span');
        if (command.isOutput) {
            text.style.color = command.isGreen ? '#27c93f' : '#a1a1aa';
            if (!command.prompt) {
                text.style.marginLeft = '20px';
            }
        }
        
        line.appendChild(text);
        terminalBody.appendChild(line);
        
        // Type out the text
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < command.text.length) {
                text.textContent += command.text[charIndex];
                charIndex++;
                setTimeout(typeChar, command.delay);
            } else {
                commandIndex++;
                setTimeout(typeCommand, 500);
            }
        };
        
        typeChar();
    }
    
    // Start typing after a short delay
    setTimeout(typeCommand, 1000);
}
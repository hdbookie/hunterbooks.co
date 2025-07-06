/* ===========================
   Terminal Animation
   =========================== */

function typeTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    const commands = [
        { prompt: '$', text: 'whoami', delay: 100 },
        { prompt: '', text: 'hunter@ai-expert', delay: 50, isOutput: true },
        { prompt: '$', text: 'cat expertise.txt', delay: 100 },
        { prompt: '', text: 'AI Orchestration | LLM Engineering | MCP Servers | 10x Automation', delay: 50, isOutput: true },
        { prompt: '$', text: 'ls ai-workflows/', delay: 100 },
        { prompt: '', text: 'multi-agent-system/  mcp-servers/  langchain-rag/  prompt-engineering/', delay: 50, isOutput: true },
        { prompt: '$', text: 'python ai_productivity.py --measure', delay: 100 },
        { prompt: '', text: 'Productivity multiplier: 10x while others achieve 1.5x', delay: 50, isOutput: true, isGreen: true },
        { prompt: '$', text: 'echo $AI_VISION', delay: 100 },
        { prompt: '', text: 'Seeing what others miss in the AI revolution...', delay: 50, isOutput: true, isGreen: true }
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
import { PORTFOLIO_DATA } from '../../../shared/data/portfolio-data.js';

/**
 * Initializes the interactive developer terminal modal.
 */
export function initCliTerminal() {
  const modal = document.getElementById('dev-terminal-modal');
  const openBtn = document.getElementById('terminal-trigger');
  const closeBtn = document.getElementById('terminal-header-close');
  const backdrop = document.getElementById('dev-terminal-backdrop');
  const output = document.getElementById('dev-terminal-output');
  const input = document.getElementById('terminal-input');

  if (!modal || !output || !input) return;

  const appendLine = (text) => {
    const p = document.createElement('p');
    p.textContent = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  };

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    appendLine(`guest@henrik-portfolio:~$ ${raw}`);

    if (cmd === 'help') {
      appendLine('Commands: bio, stack, projects, contact, clear');
    } else if (cmd === 'bio') {
      appendLine(`${PORTFOLIO_DATA.profile.name} — ${PORTFOLIO_DATA.profile.roleEs}`);
    } else if (cmd === 'stack') {
      const flat = PORTFOLIO_DATA.stackGroups.flatMap((g) => g.items).join(', ');
      appendLine(`Stack: ${flat}`);
    } else if (cmd === 'projects') {
      appendLine(`Projects: ${PORTFOLIO_DATA.projects.map((p) => p.id).join(', ')}`);
    } else if (cmd === 'contact') {
      appendLine(`Email: ${PORTFOLIO_DATA.profile.email} | GitHub: ${PORTFOLIO_DATA.profile.githubUrl}`);
    } else if (cmd === 'clear') {
      output.innerHTML = '';
    } else {
      appendLine(`Command not found: ${cmd}. Type 'help'.`);
    }
  };

  openBtn?.addEventListener('click', () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    if (!output.children.length) {
      appendLine('Welcome to Henrik Portfolio CLI. Type "help" to list commands.');
    }
    input.focus();
  });

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = input.value;
      input.value = '';
      runCommand(value);
    }
  });
}
import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import CLIProjects from '../components/CliProjects';

const CLI = props => {
  var tree = ['portfolio', ['resume.txt', 'projects.html', ['downloads', ['resume.pdf']]]];
  const [prefix, setPrefix] = useState('');
  const [availableCommands, setAvailableCommands] = useState([]);
  const [showSignature, setShowSignature] = useState(true);
  const [prevList, setPrevList] = useState([]);
  const [input, setInput] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState(tree);
  const [currentDepth, setCurrentDepth] = useState(1);
  const [number, setNumber] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const terminalRef = useRef();

  useEffect(() => {
    document.body.classList.toggle("index-page");
    setAvailableCommands([
      {
        name: 'clear',
        action: clearTerminal
      },
      {
        name: 'help',
        action: renderHelp
      },
      {
        name: 'cd',
        action: changeDirectory,
      },
      {
        name: 'ls',
        action: listDirectory,
      },
      {
        name: 'open',
        action: openFile,
      },
      {
        name: 'download',
        action: downloadFile
      }
    ]);
  }, []);

  const setFocus = () => {
    document.getElementById("input").focus();
  }

  const renderSignature = () => {
    var ascii2 = `
  ########  ########     ###    ##     ##  #######  ########      ######    #######  ########  ########  ##     ## ########  #### 
  ##     ## ##     ##   ## ##   ###   ### ##     ## ##     ##    ##    ##  ##     ## ##     ## ##     ## ##     ## ##     ##  ##  
  ##     ## ##     ##  ##   ##  #### #### ##     ## ##     ##    ##        ##     ## ##     ## ##     ## ##     ## ##     ##  ##  
  ########  ########  ##     ## ## ### ## ##     ## ##     ##    ##   #### ##     ## ########  ########  ##     ## ########   ##  
  ##        ##   ##   ######### ##     ## ##     ## ##     ##    ##    ##  ##     ## ##     ## ##     ## ##     ## ##   ##    ##  
  ##        ##    ##  ##     ## ##     ## ##     ## ##     ##    ##    ##  ##     ## ##     ## ##     ## ##     ## ##    ##   ##  
  ##        ##     ## ##     ## ##     ##  #######  ########      ######    #######  ########  ########   #######  ##     ## #### 
    `;
    return (
      <div>
        <pre style={{textAlign: 'center'}}>
          <code>
            {ascii2}
          </code>
          <code>
            <br/>Type "help" to see the list of all available commands
          </code>
        </pre>
      </div>
    );
  }

  const generateResume = () => {
    var resume = `
                                                            Pramod Gobburi\n
                                              1008 Inverery Drive, Lake Charles, LA 70605, USA\n
                                      +1(337)529-0547 | pramod.gobburi@gmail.com | www.pramodgobburi.com\n
              ==================================================================================================================\n
                Professional Summary\n
                  - I'm a Computer Science graduate from McNeese State University seeking full-time opportunities as a software
                    engineer.\n
              ------------------------------------------------------------------------------------------------------------------\n
                Work Experience\n
                  * Gophr App Inc                                                                               Lake Charles, LA
                    Full-Stack Software Engineer, May 2019 - Present
                    - Led multiple development teams, coordinated, and developed multiple projects.
                    - Developed a mobile marketplace application using React Native.
                    - Developed responsive dashboards using React.
                    - Designed and implemented cloud infrastructure in AWS.\n
                  * Freelance Developer                                                                         Lake Charles, LA
                    Software Developer, Nov 2017 - May 2019
                    - Offered consulting services for local businesses about designing software systems.
                    - Developed and published Android applications.
                    - Developed REST APIs and full-stack web applications using Django framework.
                    - Built various software components for a self-order kiosk and food ordering mobile app.
                    - Developed responsive web applications and dashboards using Angular.\n
              ------------------------------------------------------------------------------------------------------------------\n
                Education\n
                  * McNeese State University                                                                    Lake Charles, LA
                    Bachelor's in Computer Science, Minor in Mathematics
                    - Overall GPA: 3.52, Major GPA: 3.81
                    - Coursework in programming languages, database management, algorithm design,computer architecture, 
                      operating systems, and artificial intelligence.\n
              ------------------------------------------------------------------------------------------------------------------\n
                Skills\n
                  - C, C#, Java Python, and SQL                                 - Microservice frameworks (Flask, ExpressJS)
                  - HTML, CSS, Javascript                                       - Mobile App Development (Android, React Native)
                  - Frontend frameworks (Angular, React)                        - Database Management (MySQL, PostgreSQL, MongoDB)
                  - Full Stack frameworks (Django, Spring Boot, Rails, MeteorJS)\n
              =====================================================================================================================\n
  `;
  return resume;
  }
  
  const executeCommand = (e) => {
    e.preventDefault();
    var nList = prevList.slice();
    nList.push({
      type: 'input',
      prefix: prefix,
      value: input
    });
    var found = false;
    for (var i=0; i < availableCommands.length; i++) {
      var cmd = availableCommands[i];
      var firstWord = input.split(' ')[0];
      if (cmd.name === firstWord) {
        found = true;
        return cmd.action(nList, input.split(' ')[1], currentDirectory, currentDepth);
      }
    }
    if(!found) {
      nList.push({
        type: 'error',
        value: 'command not found: ' + input
      });
    }
    setPrevList(nList);
    setInput('');
  }

  const listDirectory = (nList, input, cDir) => {
    const [parent, children] = cDir;
    var list = '';
    if(Array.isArray(children)) {
      children.map(child => {
        if(Array.isArray(child)) {
          list += child[0] + ' ';
        } else {
          list += child + ' ';
        }
      });
    } else {
      if (parent && children) {
        list += parent + ' ' + children;
      } else {
        list += parent;
      }
    }
    nList.push({
      type: 'output',
      value: list
    });
    setPrevList(nList);
    setInput('');
  }

  const changeDirectory = (nList, input, cDir, depth) => {
    var [parent, children] = cDir;
    var found = false;
    var subDir = [];
    var cDepth = depth;
    if (input === '..') {
      [parent, children] = tree;
      found = true;
      if (Array.isArray(children)) {
        if(depth > 0) {
          cDepth -= 2
          subDir = tree.flat([cDepth]);
        } else {
          subDir = cDir;
        }
      }
    } else {
      if (children) {
        children.map((child, idx) => {
          if(Array.isArray(child)) {
            if (child[0] === input) {
              cDepth += 1;
              found = true;
              subDir = child[1];
            }
          } else {
            if (child === input) {
              subDir = cDir;
              found = true;
              nList.push({
                type: 'error',
                value: input + ' is not a directory'
              })
            }
          }
        });
      } else {
        subDir = cDir;
        found = true;
        nList.push({
          type: 'error',
          value: input + ' is not a directory'
        })
      }
      
    }
    if(!found) {
      nList.push({
        type: 'error',
        value: 'No such directory ' + input
      });
    } else {
      setCurrentDirectory(subDir);
      setCurrentDepth(cDepth);
      if(input === '..') {
        setPrefix('');
      } else if (subDir != cDir) {
        setPrefix(input);
      }
    }
    setPrevList(nList);
    setInput('');
  }

  const openFile = (nList, input, cDir, depth) => {
    var [parent, children] = cDir;
    var found = false;
    if (children) {
      if (children.includes(input)) {
        found = true;
      }
    } else {
      if (parent === input) {
        found = true;
      }
    }
    if(found) {
      if (input === 'resume.txt') {
        return printResume();
      } else if (input === 'projects.html') {
        nList.push({
          type: 'output',
          value: 'Opening projects.html...'
        });
        setShowProjects(true);
      } else if (input === 'resume.pdf') {
        nList.push({
          type: 'output',
          value: 'Opening resume.pdf...'
        });
        window.open('https://drive.google.com/file/d/1kRRT3Eu0iQ2K5VX2BQxV-s8-36Kx_31V/view?usp=sharing', '_blank');
      }
      else {
        nList.push({
          type: 'error',
          value: 'Unable to open specified file'
        });
      }
    } else {
      nList.push({
        type: 'error',
        value: input + ' file not found'
      });
    }
    setPrevList(nList);
    setInput('');
  }

  const downloadFile = (nList, input, cDir, depth) => {
    var [parent, children] = cDir;
    var found = false;
    if (children) {
      if(children.includes(input)) {
        if (input === 'resume.pdf') {
          found = true;
        }
      }
    } else {
      if (parent === input) {
        found = true;
      }
    }
    if (found) {
      nList.push({
        type: 'output',
        value: 'downloading file...'
      });
      setPrevList(nList);
      setInput('');
      window.open('https://drive.google.com/uc?export=download&id=1kRRT3Eu0iQ2K5VX2BQxV-s8-36Kx_31V', '_blank');
    }  else {
      nList.push({
        type: 'output',
        value: 'Unable to download specified resource'
      });
      setPrevList(nList);
      setInput('');
    }
  }

  const renderHelp = (nList) => {
    nList.push({
      type: 'output',
      value: "Available commands: 'cd', 'clear', 'download', 'help', 'ls', 'open' "
    }); 
    setPrevList(nList);
    setInput('');
  }
  const clearTerminal = () => {
    setPrevList([]);
    setInput('');
  }

  const printResume = () => {
    var resume = generateResume();
    var nList = [];
    nList.push({
      type: 'output',
      value: resume,
    });
    setPrevList(nList);
    setInput('');
  }

  useEffect(() => {
    scrollToBottom();
  }, [prevList]);

  const scrollToBottom = () => {
    var box = document.getElementById('terminal');
    box.scrollTop = box.scrollHeight;
  }

  const renderOutput = (cmd, idx) => {
    if (cmd) {
      if (cmd.type === 'error') {
        return (
          <div key={idx}>
            <pre>
              <code style={styles.error}>
                {cmd.value}
              </code>
            </pre>
          </div>
        )
      } else if (cmd.type === 'input') {
        return (
          <div style={{display: 'flex', flex: '1', flexDirection: 'row',alignItems: 'center'}} key={idx}>
            {cmd.prefix && (
              <p style={styles.terminalPrefix}>{cmd.prefix}</p>
            )}
            <p style={styles.terminalArrow}>{'>>'}</p>
            <p style={styles.prevInput}>{cmd.value}</p>
          </div>
        )
      } else if (cmd.type === 'output') {
        return (
          <pre>
            <code style={{color: 'white'}}>
                {cmd.value}
            </code>
          </pre>
        )
      } else if (cmd.type === 'output-center') {
        return (
          <pre style={{textAlign: 'center'}}>
            <code style={{color: 'white'}}>
                {cmd.value}
            </code>
          </pre>
        )
      }
    } else {
      return null;
    }
  }
  const renderPrevList = () => {
    if(prevList.length > 0) {
      return (
        <div>
          {prevList.map((cmd, idx) => {
            return renderOutput(cmd, idx);
          })}
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <div className="wrapper">
      <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container style={styles.container}>          
          <div style={styles.terminalWindow} onClick={setFocus} ref={terminalRef} id="terminal">
            {renderSignature()}
            {renderPrevList()}
            <div style={{display: 'flex', flex: '1', flexDirection: 'row',alignItems: 'center'}}>
              {prefix && (
                <p style={styles.terminalPrefix}>{prefix}</p>
              )}
              <p style={styles.terminalArrow}>{'>>'}</p>
              <form onSubmit={executeCommand}>
                <input id="input" autoFocus={true} autoComplete="off" autoCorrect={false} type="text" value={input} style={styles.terminalInput} onChange={e => {
                  scrollToBottom();
                  setInput(e.target.value);
                }}/>
              </form>
            </div>
            {renderOutput()}
          </div>
        </Container>
        {showProjects && (
          <div style={{position: 'absolute', top: '5%', bottom: '5%', left: '10%', right: '10%', 
            backgroundColor: 'black', zIndex: 100, justifyContent: 'center', display: 'flex', alignItems: 'center'
          }}>
            <div style={{backgroundColor: '#171941', overflow: 'scroll', width: '98%', height: '96%'}}>
              <CLIProjects />
            </div>
            <Button className="btn-round" onClick={() => setShowProjects(false)} color="primary" style={{position: 'absolute', top: -15, right: -15, zIndex: 1000, paddingLeft: 12, paddingRight: 12}}>
              <i className="tim-icons icon-simple-remove" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
};

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    overflow: 'hidden',
    paddingTop: 0,
  },
  terminalWindow: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%', 
    height: '90%',
    display: 'fex', 
    flexDirection: 'column-reverse',
    borderRadius: 10, 
    borderColor: 'white', 
    borderWidth: 1,
    padding: 20,
    overflow: 'auto',
  },
  terminalPrefix: {
    fontSize: 14,
    color: '#39ff14',
    marginTop: 2,
    marginRight: 5,
    fontFamily: 'Courier, Monaco, monospace',
  },
  terminalArrow: {
    fontSize: 16,
    color: '#39ff14',
    paddingTop: 5,
    marginRight: 6,
    fontFamily: 'Courier, Monaco, monospace',
  },
  terminalInput: {
    color: 'white',
    backgroundColor: 'transparent',
    borderWidth: 0,
    outline: 'none',
    fontSize: 14,
    fontFamily: 'Courier, Monaco, monospace',
  },
  error: {
    color: 'red',
  },
  prevInput: {
    color: 'white',
    backgroundColor: 'transparent',
    borderWidth: 0,
    outline: 'none',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Courier, Monaco, monospace',
  }
}

export default CLI;
import { React, useState, useRef } from 'react';
import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';

const contents_data = [
  { id: 0, title: 'HTML', desc: 'HTML is for information' },
  { id: 1, title: 'CSS', desc: 'CSS is for design' },
  { id: 2, title: 'JavaScript', desc: 'JavaScript is for interactive' },
];

function App() {
  const [title, setTitle] = useState('WEBBBBB');
  const [sub, setSub] = useState('world wide web!');
  const [mode, setMode] = useState('welcome');
  const [selected_content_id, setSelected] = useState(2);
  const [contents, setContents] = useState(contents_data);
  const max_content_id = useRef(2);
  const welcome = { title: 'Welcome', desc: 'Hello, React!!' };
  var _title,
    _desc = null;
  var _article = null;
  function getReadContent() {
    var i = 0;
    while (i < contents.length) {
      var data = contents[i];
      if (data.id === selected_content_id) {
        _title = data.title;
        _desc = data.desc;
        return data;
      }
      i += 1;
    }
  }
  function getContent() {
    if (mode === 'welcome') {
      _title = welcome.title;
      _desc = welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (mode === 'read') {
      let _content = getReadContent();
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (mode === 'create') {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            max_content_id.current += 1;
            //contents.push({ id: max_content_id, title: _title, desc: _desc });
            // mode = 'create';와 마찬가지로 직접 넣어주면 리액트에서 값이 바뀌었는지 알 수 없음
            const new_contents = contents.concat({
              id: max_content_id.current,
              title: _title,
              desc: _desc,
            });
            setContents(new_contents);
            setMode('read');
            setSelected(max_content_id);
            // debugger;
            // console.log(contents);
          }}
        />
      );
    } else if (mode === 'update') {
      let _content = getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            let _contents = Array.from(contents);
            console.log('props : ', _id, _title, _desc);
            let i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i += 1;
            }
            setContents(_contents);
            setMode('read');
          }}
        />
      );
    }
    return _article;
  }

  return (
    <div className="App">
      <Subject
        title={_title}
        sub={_desc}
        onChangePage={function () {
          setMode('welcome');
        }}
      />
      <TOC
        contents={contents}
        onChangePage={function (id) {
          setMode('read');
          setSelected(Number(id));
        }}
      />
      <Control
        onChangeMode={function (_mode) {
          if (_mode === 'delete') {
            if (window.confirm('really?')) {
              let _contents = Array.from(contents);
              let i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i += 1;
              }
              setMode('welcome');
              setContents(_contents);
              setSelected(0);
              alert('deleted');
            }
          } else {
            setMode(_mode);
          }
        }}
      />
      {getContent()}
    </div>
  );
}

export default App;

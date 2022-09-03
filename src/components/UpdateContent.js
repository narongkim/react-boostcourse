import { React, useState } from 'react';

function UpdateContent(props) {
  console.log('UpdateContent render : ');
  console.log(props.data);
  const [data, setData] = useState(props.data);

  function inputFormHandler(e) {
    setData((prevState) => {
      //   let copy = Object.assign({}, prevState);
      //   copy[e.target.name] = e.target.value;
      //   let copy = {...prevState, [e.target.name]: e.target.value };
      //   console.log('copy: ', copy);
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }
  return (
    <article>
      <h2>Update</h2>
      <form
        action="/create_process"
        method="post"
        onSubmit={function (e) {
          e.preventDefault();
          console.log('dataL ', data);
          props.onSubmit(data.id, data.title, data.desc);
          alert('Submit!');
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={data.title}
            onChange={inputFormHandler}
          />
        </p>
        <p>
          <textarea
            name="desc"
            placeholder="description"
            value={data.desc}
            onChange={inputFormHandler}
          ></textarea>
        </p>
        <p>
          <input type="submit"></input>
        </p>
        <input type="hidden" name="id" value={data.id} />
      </form>
    </article>
  );
}

export default UpdateContent;

function TOC(props) {
  const TOC_lists = props.contents.map((item) => (
    <li key={item.id}>
      <a
        href={'1.html'}
        data-id={item.id}
        onClick={function (e) {
          e.preventDefault();
          props.onChangePage(e.target.dataset.id); // 문자로 넘어감
        }}
      >
        {item.title}
      </a>
    </li>
  ));
  console.log('TOC render');
  return (
    <nav>
      <ul>{TOC_lists}</ul>
    </nav>
  );
}

export default TOC;

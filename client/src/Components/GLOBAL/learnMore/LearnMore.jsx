export const LearnMore = ({ header, link, path }) => {
  return (
    <section className="manual">
      <p>{header}</p>
      <button className="btnn ">
        <a href={link}>{path}</a>
      </button>
    </section>
  );
};

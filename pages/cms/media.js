
/**
 *
 * @returns {object} props
 */
export async function getStaticProps() {
  return {
    props: {foo: "bar"},
  };
}

const MediaPage = (props) => {
  const {foo} = props;

  return <div>Media Page</div>;
};

export default MediaPage;


/**
 *
 * @returns {object} props
 */
export async function getStaticProps() {
  return {
    props: {foo: "bar"},
  };
}

const PostsPage = (props) => {
  const {foo} = props;

  return <div>Posts</div>;
};

export default PostsPage;

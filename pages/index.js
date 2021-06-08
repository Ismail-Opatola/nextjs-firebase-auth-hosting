import Link from "next/link";
/**
 *
 * @returns {object} props
 */
export async function getStaticProps() {
  return {
    props: {foo: "bar"},
  };
}

const Home = (props) => {
  const {foo} = props;

  return <div>
    <p>Hello there, Fellas! Foo = "{foo}";</p>
    <br />
    <hr />
    <br />
    <ul>
      <li><Link href="/cms"><a>CMS</a></Link></li>
      <li><Link href="/cms/posts"><a>POSTS</a></Link></li>
      <li><Link href="/cms/media"><a>MEDIA</a></Link></li>
    </ul>
  </div>;
};

export default Home;

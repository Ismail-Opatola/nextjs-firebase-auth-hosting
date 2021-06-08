import Link from "next/link";
import {useAuth} from "../../../lib/services/auth.context";

const DashboardPage = () => {
  const {isLoding, error, user} = useAuth();

  return <div>
    <p>Welcome {user && user.displayName + ""}to CMS Dashboard</p>
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

export default DashboardPage;

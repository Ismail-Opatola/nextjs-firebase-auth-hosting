import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../../lib/services/auth.context";
import styles from "./Header.module.scss";
import clsx from "clsx";
import Image from "next/image";
import {Modal} from "../../utilities";
import {signOutService} from "../../../lib/services/auth.service";

const Header = () => {
  const {user} = useAuth();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSignOut = () => signOutService().catch((err) => console.log(err));

  return <>
    <header className={clsx(styles.header, "max-width-11")}>
      <p className={styles.logo}>ISMAIL <span className="text-bold">OPATOLA</span></p>

      <nav>
        <button onClick={onOpenModal}>
          <Image
            width={30}
            height={30}
            className={styles.avatar}
            src={user && user.photoURL}
            alt={"a picture of " + user.displayName} />
          <i className="fas fa-caret-down"></i>
        </button>
      </nav>

      <Modal visible={open} onClose={onCloseModal} center>
        <div className={styles.modalBody}>
          <small>Logged in as</small>
          <p>{user && user.displayName}</p>
          <hr />
          <ul>
            <li>
              <a>User Settings
                <i class="fas fa-user-cog"></i>
              </a>
            </li>
            <li> <button onClick={handleSignOut}>SignOut <i class="fas fa-sign-out-alt"></i></button></li>
          </ul>
        </div>
      </Modal>
    </header>
  </>;
};

export default Header;

/**
 * Note:
 * Header can be imported in auth.context.js,
 * however incase of seo where Header should be in body tag,
 * import seperately or in layout.js.
 */

/**
 * TODO:
 * 1 import user from authContext
 * 2 markup - Logo, profilePic, Modal signout, user settings
 * 3 Signout handler
 * 4. Navigation
 * 5. Nested Page Nav
 */

import * as React from "react";
import styles from "./style.css";
import * as assets from "./assets";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <div className={styles["logo"]}>
        <img src={assets.LOGO_IMAGE} />
      </div>
      farm-i18n
    </div>
  )
}

export default Header;

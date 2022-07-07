import React from 'react'
import styles from '../styles/Footer.module.scss'

function Footer() {
return (<div className={styles.footertext}>
  <footer className={styles.footercontent}>
    <p className={styles.githubname}> Co-authors: </p>
    <a className={styles.githubname} href="https://github.com/donnysnarko">Kazimierz Jankowski </a>
    <a className={styles.githubname} href="https://github.com/Laleh-S">Laleh Shahidi </a>
    <a className={styles.githubname} href="https://github.com/luke-o-brien">Luke O'Brien </a>
    <a className={styles.githubname} href="https://github.com/tjmcodes">Teresa Morini </a>
  </footer>
</div>)
}

export default Footer
import Link from "next/link"
import classes from "./header.module.css"
export default function Header(){
    return(
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Главное меню</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
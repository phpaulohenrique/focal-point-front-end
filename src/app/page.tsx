import Image from 'next/image'
import styles from './page.module.css'
import { Header } from '@/components/header'
import Trash from '@/assets/trash.svg'

export default function Home() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div>
                    <h2>Suas tarefas de hoje</h2>

                    <div>
                        <ul>
                            <li>
                                <input type="checkbox" />
                                <p>Lavar as mãos</p>
                                <Image src={Trash} alt="Excluir tarefa" />
                            </li>
                            {/* <li>Item 2</li> */}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}

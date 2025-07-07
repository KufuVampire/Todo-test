import { Container } from '../Container/Container';
import styles from './styles.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<Container>
				<h1 className={styles.title}>Todos</h1>
			</Container>
		</header>
	);
};

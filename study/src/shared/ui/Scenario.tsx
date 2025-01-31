import styles from "./styles.module.css";

interface ScenarioProps {
  title: string;
  children: React.ReactNode;
}

export const Scenario: React.FC<ScenarioProps> = ({ title, children }) => {
  return (
    <section className={`${styles.scenario} border-t mt-2`}>
      <h1>{title}</h1>
      {children}
    </section>
  );
};

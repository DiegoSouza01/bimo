import database from "../../infra/database";

export async function getServerSideProps() {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  return {
    props: {
      statusData: {
        updated_at: updatedAt,
        database_version: databaseVersionValue,
      },
    },
  };
}

export default function StatusPage({ statusData }) {
  return (
    <div>
      <h1>Status do Sistema</h1>
      <p>Última atualização: {statusData.updated_at}</p>
      <p>Versão do Postgres: {statusData.database_version}</p>
      
      <hr />
      <pre>{JSON.stringify(statusData, null, 2)}</pre>
    </div>
  );
}

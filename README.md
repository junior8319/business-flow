# Projeto Business-Flow

## Autor:
<p>Antonio Carlos Nunes da Silva Júnior</p>

## Descrição
<p>Este projeto consiste de uma aplicação para gerenciemanto de fluxo de negócios (Notas fiscais e pagamentos) de uma ou de várias empresas entre si.</p>

## Linguagens, Frameworks e Plataforma de Banco de Dados:
<ul>
  <li>Javascript</li>
  <li>Typescript</li>
  <li>Node.js</li>
  <li>Vue.js</li>
  <li>MySQL</li>
</ul>

## Ferramentas utilizadas:
<ul>
  <li>Express.js</li>
  <li>Sass</li>
  <li>Sequelize</li>
  <li>Dotenv</li>
</ul>

## Para rodar
### Clone o repositório usando https, no seu terminal execute o comando:
`git clone https://github.com/junior8319/business-flow.git`

### ou usando sua chave ssh, também no terminal com o comando:
`git clone git@github.com:junior8319/business-flow.git`

<p>Se funcionar corretamente, será feito o download no local onde o comando foi executado, da pasta business-flow.</p>

### Aplicação back-end
### Acesse a pasta business-flow/backend:
<p>Para instalar as dependências de back-end, execute:</p>

`npm install`

<p>Após a instalação das dependências, abra 'backend/env.example'</p>
<p>Altere o nome deste arquivo para .env ou copie o seu conteúdo para um arquivo camado .env</p>
<p>Abra este arquivo (.env) e altere os valores das variáveis para os seus dados de conexão com banco de dados mysql</p>
<hr>
<p>Estou supondo neste momento, que você já tem o serviço mysql instalado e rodando na sua máquina</p>
<p>Futuramente este projeto será ambientado em docker e este README conterá links de instruções para instalação de docker e mysql</p>
<hr>
<p>Se esta configuração estiver correta e o servidor mysql estiver em funcionamento, será possível 'levantar' o banco em sua máquina com:</p>

`npm run db:reset`

<p>Se isto funcionar corretamente será criado o banco de dados chamado cashforce_v3 no seu servidor mysql com as seguintes tabelas:</p>
<ul>
  <li>buyers</li>
  <li>cnpjs</li>
  <li>offers</li>
  <li>orderOptions</li>
  <li>orders</li>
  <li>providers</li>
  <li>sponsors</li>
  <li>users</li>
</ul>
<p>Mais a tabela SequelizeMeta, que contém dados de configuração gerados pelo sequelize.js</p>

<p>Assim já teremos uma aplicação de back-end e para disponibilizar o servidor, execute o seguinte comando no terminal: (você deve estar na pasta '/backend')</p>

`npm run dev`

### Aplicação front-end
### Acesse a pasta business-flow/frontend:

<p>Para instalar as dependências de front-end, execute:</p>

`npm install`

<p>Após a instalação das dependências, abra 'front/env.example'</p>
<p>Altere o nome deste arquivo para .env ou copie o seu conteúdo para um arquivo camado .env</p>
<p>Abra este arquivo (.env) e altere o valor da variável a porta que foi utilizada pelo servidor de backend</p>
<p>Se esta configuração estiver correta será possível 'levantar' a aplicação, execute o seguinte comando no terminal: (você deve estar na pasta '/frontend')</p>

`npm run serve`

<p>Caso isto funcione corretamente, será disponibilizado o link no terminal onde o comando foi executado, segure a tecla 'Ctrl' ou equivalente e clique no link '- Local: http://...' </p>

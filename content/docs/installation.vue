<template>
  <div class="content">
    <DocSection name="Installing Connectors">
      <Code :langs="['Python (bash)', 'R']" :syntax="['shell', 'r']" :sources="[code0, code1]" />
    </DocSection>
    <DocSection name="Dashboard">
      Arena is available at <a href="https://arena.drwhy.ai">https://arena.drwhy.ai</a> and you don't need to to run it by yourself. In some cases, like accessing data source running on your local network, you have to use <b>not https</b>. We don't enforce ssl to make it possible. Just replace <b>https://</b> with <b>http://</b> in the url.
    </DocSection>
    <DocSection name="Running own Arena dashboard server">
      <Code :langs="['Bash']" :syntax="['shell']" :sources="[code2]" />
    </DocSection>
  </div>
</template>
<script>
export default {
  name: 'DocsInstallation'
}
</script>
<!-- eslint-disable -->
<codesrc>
pip install dalex
pip install requests
# packages required for live mode
pip install Flask
pip install Flask-cors
</codesrc>
<codesrc>
# stable version
install.packages('arenar')
# latest version
remotes::install_github('ModelOriented/Arenar')
</codesrc>
<codesrc>
git clone https://github.com/ModelOriented/Arena
cd Arena
npm run install
npm run build
cp -R dist/* /path/to/your/http/server/
</codesrc>

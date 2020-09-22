<template>
  <div class="content">
    <DocSection name="Installing Packages">
      <Code :langs="['Python (bash)', 'R']" :syntax="['shell', 'r']" :sources="[code0, code1]" />
    </DocSection>
  </div>
</template>
<script>
export default {
  name: 'DocsInstallation',
  data () {
    return {
    }
  }
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

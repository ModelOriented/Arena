<template>
  <div class="content">
    <DocSection name="What is session">
      A session is the current state of the dashboard, including:
      <ul>
        <li>Opened charts with their size, position, and name</li>
        <li>Charts options</li>
        <li>Annotations</li>
        <li>Clipboard</li>
        <li>Custom colors for params</li>
        <li>Addresses to data sources</li>
      </ul>
    </DocSection>
    <DocSection name="What can be shared">
      A session does not include the content of data sources, only URLs. That is why not everything is shareable.
      <ul>
        <li>Static data sources (JSON file) uploaded on GitHub Gist or another server - can be shared as long as the file is accessible for the user</li>
        <li>Live data sources - works in most local networks. If you run connector on a publicly available server, then the session is also sharable</li>
        <li>Manually uploaded static data sources - not sharable</li>
      </ul>
      Any of the above is sharable using the new experimental feature <NLink to="/guide/p2p-sharing">Peer to Peer Sharing</NLink>, but the mechanism is different.
    </DocSection>
    <DocSection name="Methods of saving and sharing">
      A Session is a JSON file, and Arena proposes three ways of sharing it.
      <ul>
        <li>Auto save - each <b>named</b> session is saved automatically in your browser. You can open it in the Sessions menu.</li>
        <li>Download as file and save for later, upload it manually, or send to your friend</li>
        <li>Upload to GitHub Gist - Arena uploads session for you and returns a simple URL</li>
      </ul>
    </DocSection>
  </div>
</template>
<script>
export default {
  name: 'SharingSession'
}
</script>

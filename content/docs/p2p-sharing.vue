<template>
  <div class="content">
    <DocSection name="Introduction">
      Peer to peer sharing is an experimental feature.
      It allows for creating a connection between two browsers.
      One user can share his state using a simple link.
      Each time the second users open a new plot, his browser asks for it the sharing computer.
    </DocSection>
    <DocSection name="Requirements">
      Both devices do not need to have a public IP address.
      However, both are required not to use symmetric NAT in their LAN.
      This assumption fails in the networks of some large institutions like universities.
    </DocSection>
    <DocSection name="Run sharing">
      You can generate a URL in the sessions tab of settings.
      <Player video-id="466524506" />
    </DocSection>
    <DocSection name="Development Status">
      There are still a few unresolved issues:
      <ul>
        <li>attributes and custom observations</li>
        <li>displaying connection errors</li>
        <li>splitting packets into smaller ones for larger plots</li>
      </ul>
    </DocSection>
    <DocSection name="Peer2Peer vs session sharing">
      Session sharing saves the state of Arena in the moment of pressing the share button.
      In this method, export occurs in the moment of opening link.<br>
      An exported session is usable as long as the user can access data sources.
      On the other hand, p2p sharing passthrough all traffic by the primary user's browser.
      He cannot close his Arena, but connectors could run on his local computer.
    </DocSection>
  </div>
</template>

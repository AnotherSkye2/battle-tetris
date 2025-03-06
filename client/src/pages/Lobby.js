export default function Lobby() {
  const self = this
  self.socket = io()
  return `<>
  <Chat socket="{{self.socket}}"/>
  </>`
}
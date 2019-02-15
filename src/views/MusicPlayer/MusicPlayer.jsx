import React from 'react'
import bgmusic from '@audio/onetwo.mp3'

export default class MusicPlayer extends React.Component {
  componentDidMount() {
      const autoPlay = async() => {
        try {
          await this.refs.audio.play()
        } catch (e) {
          console.log(e)
        }
        document.removeEventListener('click', autoPlay)
        document.removeEventListener('touchstart', autoPlay)
      }
      document.addEventListener('click', autoPlay)
      document.addEventListener('touchstart', autoPlay)
  }

  render() {
    // const routerMatch = this.props.pathname === '/auth' || this.props.pathname === '/home'
    const routerMatch = false
    return (
      <div>
        {
          routerMatch ? <audio ref="audio" src={bgmusic} ></audio> : null
        }
      </div>
    )
  }
}

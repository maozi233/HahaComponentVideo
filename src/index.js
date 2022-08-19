// import videojs from "video.js";
// import "video.js/dist/video-js.css";

import "./index.less";
import { addClass } from './utils'

export class HahaVideo {

  constructor(options) {
    // 生成scope
    const scope = Math.random().toString(36).slice(-6);
    options.scope = scope;

    this.options = options;

    const { el } = options;

    if (!el) {
      return new Error('缺少容器实例')
    }
    
    addClass(el, 'haha__video__wrapper');
    this.initVideo()
  }

  /**
   * 快速获取含有scope的dom
   * @param {str} selector 
   * @returns 
   */
  getelement(selector) {
    return document.querySelector(`${selector}[scope-${this.options.scope}]`)
  }

  /**
   * 初始化视频
   */
  initVideo() {
    const { el, src, scope } = this.options;

    el.innerHTML = `
      <video scope-${scope} class="haha__video" src="${src}"></video>
      <div scope-${scope} class="haha__control__wrapper">
        
        <div scope-${scope} class="btn__play__wrapper btn__wrapper">
          <img scope-${scope} class="btn__play" src="https://m.hahabianli.com/img/wx_xcx/merchant/play.png">
        </div>

        <div scope-${scope} class="btn__time__wrapper"></div>

        <div scope-${scope} class="progress__bar">
          <div class="bar__bg"></div>
          <i class="bar__dot"></i>
        </div>
      </div>
    `

    const video = this.getelement('.haha__video');
    const time = this.getelement('.btn__time__wrapper');
    const bar = this.getelement('.progress__bar');
    const current = this.getelement('.bar__bg');
    const dot = this.getelement('.bar__dot');

    const formatSecound = (time) => {
      const t = parseInt(time % 60);
      return t < 10 ? `0${t}` : t 
    }

    /** 初始化点击事件 */
    const initClick = () => {
      const btnPlay = this.getelement('.btn__play__wrapper');
      btnPlay.onclick = this.togglePlay.bind(this);

       // 鼠标点击的时候，跳转
      bar.onmousedown = (e) => {
        console.log(e);
        current.style.width = e.layerX + 'px'; //e.layerX 是点击的时候的位置。
        dot.style.left = e.layerX + 'px';
        video.currentTime = e.layerX / parseInt(window.getComputedStyle(video, null).width) * video.duration; //计算出点击的位置在总时间里面占多少。
        updateTime();
      }
    }
    /** 更新时间 */
    const updateTime = () => {
      const cur = parseInt(video.currentTime / 60) + ":" + formatSecound(video.currentTime);
      const duration = parseInt(video.duration / 60) + ":" + formatSecound(video.duration);

      time.innerHTML = `${cur} / ${duration}`;

      if (!this.updateInterval) {
        this.updateInterval = setInterval(updateTime, 1000)
      }
    }

    /** 视频加载完毕 */
    video.onloadedmetadata = () => {
      updateTime();
      updateBar();
      initClick();
    }

  }

  /**
   * 切换播放状态
   */
  togglePlay() {
    const video = this.getelement('.haha__video');
    const wrapper = this.getelement('.btn__play__wrapper')

    if (video.paused) {
      video.play();
      wrapper.innerHTML = `<img scope-${this.options.scope} class="btn__pause" src="https://m.hahabianli.com/img/wx_xcx/merchant/pause.png">`
    } else {
      video.pause();
      wrapper.innerHTML = `<img scope-${this.options.scope} class="btn__play" src="https://m.hahabianli.com/img/wx_xcx/merchant/play.png">`
    }
  }
}
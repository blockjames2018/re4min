<template >
  <div class="drum">
    <div class="logo">
      <div class="bottom-player">
        <div>
          <img src="img/logo.png" />
        </div>
        <div class="player">
          <img src="img/reset.png" @click="resetM()" />
          <div v-touch:tap="startSound">
            <img src="img/stop.png" v-show="!playing" />
            <img src="img/start.png" v-show="playing" />
          </div>
          <img src="img/video.png" />
        </div>
        <div class="mapNodeList">
          <div class="mapNext">
            <img v-if="mapTotalWidth === 0" src="img/l.png" />
            <img
              v-else
              src="img/r.png"
              @click="mapRollData('back')"
              style="transform: rotate(180deg)"
            />
          </div>
          <div class="mapListInfo" ref="mapListContainer">
            <div class="progress-wrapper">
              <span class="time">{{ getShowTime() }}</span>
              <div class="progress-bar-wrapper">
                <div class="progress-bar" ref="progressBar">
                  <div class="bar-inner">
                    <div class="progress" ref="progress"></div>
                    <div
                      class="progress-btn-wrapper"
                      ref="progressBtn"
                      @touchmove.prevent="progressTouchMove"
                    >
                      <div class="progress-btn"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mapInfo">
              <div v-for="(track, index) in tracks" class="track" :key="index">
                <div class="track_flex">
                  <div
                    :class="{
                      block: true,
                      bass: tracksName[index] === 'bass',
                      sfx: tracksName[index] === 'sfx',
                      drums: tracksName[index] === 'drums',
                      synth: tracksName[index] === 'synth',
                      cymbals: tracksName[index] === 'cymbals',
                      piano: tracksName[index] === 'piano',
                      guitar: tracksName[index] === 'guitar',
                      keys: tracksName[index] === 'keys',
                      blockCheck: check(track, n - 1),
                    }"
                    :key="n + 'w'"
                    v-for="n in parseInt(notevalue)"
                  >
                    &#160;
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mapNext">
            <img
              v-show="mapTotalWidth < mapCountWidth"
              src="img/r.png"
              @click="mapRollData('next')"
            />
            <img
              v-show="mapTotalWidth >= mapCountWidth"
              src="img/l.png"
              style="transform: rotate(180deg)"
            />
          </div>
        </div>
      </div>
    </div>
    <main>
      <div class="container">
        <div class="bracket1">
          <!-- <img src="img/bracket.png" /> -->
          <div class="jKNSgD" style="opacity: 0">
            <div class="jkaEgP">
              <div class="jkdwEk">
                <span class="sc-cSHVUG cYSnRy">Channels</span>
              </div>
              <div class="eAnnxY">
                <span class="sc-cSHVUG VkIKe">Hit</span>
              </div>
            </div>
          </div>
          <div class="tickerNum" ref="numContainer">
            <div class="sc-Num jKNSgD">
              <div
                v-for="(n, index) in parseInt(notevalue)"
                :key="index + 30"
                :class="{ ticker: true }"
              >
                {{ n }}
              </div>
            </div>
          </div>
        </div>
        <div class="trackcontainer">
          <div class="trackNodeName">
            <div v-for="(track, index) in tracks" class="track" :key="index">
              <div v-if="showTracks == index && !isFristTracks">
                <div class="track_flex" @click="getShowTracks(-1)">
                  <img :src="'img/' + tracksName[index] + 'Icon.png'" />
                </div>
                <div class="closeIcon" @click="getShowTracks(-1)">
                  <img src="img/close.png" />
                </div>
              </div>
              <div
                v-else
                @click="getShowTracks(index, false)"
                class="track_flex"
              >
                <img :src="'img/' + tracksName[index] + 'Icon.png'" />
              </div>
            </div>
          </div>
          <div class="trackNodeList" ref="listContainer">
            <div class="leftOrRight">
              <div>
                <img
                  v-show="totalWidth != 0"
                  src="img/dleft.png"
                  class="changeImg"
                />
                <img
                  v-show="totalWidth != 0"
                  @click="rollData('back')"
                  src="img/left.png"
                  class="changeLeft"
                />
              </div>
              <div>
                <img
                  v-show="totalWidth < countWidth"
                  @click="rollData('next')"
                  src="img/right.png"
                  class="changeRight"
                />
                <img
                  v-show="totalWidth < countWidth"
                  src="img/dright.png"
                  class="changeImg"
                />
              </div>
            </div>

            <div class="listInfo">
              <div v-for="(track, index) in tracks" class="track" :key="index">
                <div v-if="showTracks == index && !isFristTracks">
                  <div class="track_flex">
                    <div
                      :class="{
                        block: true,
                        bassPlayer:
                          n == current && tracksName[index] === 'bass',
                        active: n == current,
                        bass: tracksName[index] === 'bass',
                        sfx: tracksName[index] === 'sfx',
                        drums: tracksName[index] === 'drums',
                        synth: tracksName[index] === 'synth',
                        cymbals: tracksName[index] === 'cymbals',
                        piano: tracksName[index] === 'piano',
                        guitar: tracksName[index] === 'guitar',
                        keys: tracksName[index] === 'keys',
                        blockCheck: check(track, n - 1),
                      }"
                      :key="n + 't'"
                      v-for="n in parseInt(notevalue)"
                       @click="getShowTracks(-1)"
                    >
                      &#160;
                    </div>
                  </div>
                  <div
                    v-for="(tracker, item) in track"
                    class="track track_flex"
                    :key="item + 10"
                  >
                    <div
                      v-touch:tap="toggleActivate(tracker, item, n)"
                      :ref="n"
                      :class="{
                        blockMini: true,
                        active: n == current,
                        bass: tracksName[index] === 'bass',
                        sfx: tracksName[index] === 'sfx',
                        drums: tracksName[index] === 'drums',
                        synth: tracksName[index] === 'synth',
                        cymbals: tracksName[index] === 'cymbals',
                        piano: tracksName[index] === 'piano',
                        guitar: tracksName[index] === 'guitar',
                        keys: tracksName[index] === 'keys',
                        blockCheck: tracker.activate[n - 1],
                      }"
                      :key="n + 's'"
                      v-for="n in parseInt(notevalue)"
                      :id="tracker.id + n"
                      @mouseover="
                        mouseOverNode(tracker.id, n, tracker.activate[n - 1])
                      "
                      @mouseleave="
                        mouseLeaveNode(tracker.id, n, tracker.activate[n - 1])
                      "
                    >
                      &#160;
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  @click="getShowTracks(index, false)"
                  class="track_flex"
                >
                  <div
                    :class="{
                      block: true,
                      bassPlayer: n == current && tracksName[index] === 'bass',
                      active: n == current,
                      bass: tracksName[index] === 'bass',
                      sfx: tracksName[index] === 'sfx',
                      drums: tracksName[index] === 'drums',
                      synth: tracksName[index] === 'synth',
                      cymbals: tracksName[index] === 'cymbals',
                      piano: tracksName[index] === 'piano',
                      guitar: tracksName[index] === 'guitar',
                      keys: tracksName[index] === 'keys',
                      blockCheck: check(track, n - 1),
                    }"
                    :key="n + 'y'"
                    v-for="n in parseInt(notevalue)"
                  >
                    &#160;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bracket" style="margin-top: -35px">
          <img src="img/bracket.png" />
        </div>
      </div>
      <div class="nftInfo" v-show="showNftInfo">
        <div>
          <p>owner：</p>
          <span>0x2d56Ee9556c...edDe</span>
        </div>
        <div>
          <p>info：</p>
          <span>The first art movement.</span>
        </div>
        <div class="date">date: 2022/02/09</div>
      </div>
    </main>
  </div>
</template>

<script>
/* eslint-disable */
import * as Tone from "tone";
import $ from "jquery";
export default {
  data() {
    return {
      loading: true,
      current: 0,
      notevalue: 960,
      playing: false,
      bpm: 30,
      //bass sfx drums synth cymbals piano guitar keys
      tracks: [
        //1,bass
        [
          { id: "Kick1", name: "Kick 1", res: "type1", activate: [], info: [] },
          { id: "Kick2", name: "Kick 2", res: "type2", activate: [], info: [] },
          {
            id: "Percussion1",
            name: "Percussion 1",
            res: "type3",
            activate: [],
            info: [],
          },
          {
            id: "Percussion2",
            name: "Percussion 2",
            res: "type4",
            activate: [],
            info: [],
          },
          {
            id: "RimshotSnare1",
            name: "Rimshot Snare 1",
            res: "type5",
            activate: [],
            info: [],
          },
          {
            id: "RimshotSnare2",
            name: "Rimshot Snare 2",
            res: "type6",
            activate: [],
            info: [],
          },
          {
            id: "Snare1",
            name: "Snare 1",
            res: "type7",
            activate: [],
            info: [],
          },
          {
            id: "Snare2",
            name: "Snare 2",
            res: "type8",
            activate: [],
            info: [],
          },
        ],
        //2,sfx
        [
          {
            id: "ClosedHihat1",
            name: "Closed Hihat 1",
            res: "type1",
            activate: [],
            info: [],
          },
          {
            id: "ClosedHihat2",
            name: "Closed Hihat 2",
            res: "type2",
            activate: [],
            info: [],
          },
          {
            id: "Crash1",
            name: "Crash 1",
            res: "type3",
            activate: [],
            info: [],
          },
          {
            id: "Crash2",
            name: "Crash 2",
            res: "type4",
            activate: [],
            info: [],
          },
          {
            id: "OpenHihat1",
            name: "Open Hihat 1",
            res: "type5",
            activate: [],
            info: [],
          },
          {
            id: "OpenHihat2",
            name: "Open Hihat 2",
            res: "type6",
            activate: [],
            info: [],
          },
          { id: "Ride1", name: "Ride 1", res: "type7", activate: [], info: [] },
          { id: "Ride2", name: "Ride 2", res: "type8", activate: [], info: [] },
        ],
        //3,drums
        [
          {
            id: "Kick1-C",
            name: "Kick1-C",
            res: "type1",
            activate: [],
            info: [],
          },
          {
            id: "Kick2-D",
            name: "Kick2-D",
            res: "type2",
            activate: [],
            info: [],
          },
          {
            id: "Percussion1",
            name: "Percussion1",
            res: "type3",
            activate: [],
            info: [],
          },
          {
            id: "Percussion2",
            name: "Percussion2",
            res: "type4",
            activate: [],
            info: [],
          },
          {
            id: "RimshotSnare1",
            name: "RimshotSnare1",
            res: "type5",
            activate: [],
            info: [],
          },
          {
            id: "RimshotSnare2",
            name: "RimshotSnare2",
            res: "type6",
            activate: [],
            info: [],
          },
          {
            id: "Snare1-F",
            name: "Snare1-F",
            res: "type7",
            activate: [],
            info: [],
          },
          {
            id: "Snare2-A",
            name: "Snare2-A",
            res: "type8",
            activate: [],
            info: [],
          },
        ],
        //4,synth
        [
          {
            id: "ClosedHihat1",
            name: "ClosedHihat1",
            res: "type1",
            activate: [],
            info: [],
          },
          {
            id: "ClosedHihat2",
            name: "ClosedHihat2",
            res: "type2",
            activate: [],
            info: [],
          },
          {
            id: "Crash1",
            name: "Crash1",
            res: "type3",
            activate: [],
            info: [],
          },
          {
            id: "Crash2",
            name: "Crash2",
            res: "type4",
            activate: [],
            info: [],
          },
          {
            id: "OpenHihat1",
            name: "OpenHihat1",
            res: "type5",
            activate: [],
            info: [],
          },
          {
            id: "OpenHihat2",
            name: "OpenHihat2",
            res: "type6",
            activate: [],
            info: [],
          },
          {
            id: "Ride1",
            name: "Ride1",
            res: "type7",
            activate: [],
            info: [],
          },
          {
            id: "Ride2",
            name: "Ride2",
            res: "type8",
            activate: [],
            info: [],
          },
        ],
        //5,cymbals
        [
          {
            id: "A03",
            name: "A03",
            res: "type1",
            activate: [],
            info: [],
          },
          {
            id: "C3",
            name: "C3",
            res: "type2",
            activate: [],
            info: [],
          },
          {
            id: "C4",
            name: "C4",
            res: "type3",
            activate: [],
            info: [],
          },
          {
            id: "D03",
            name: "D03",
            res: "type4",
            activate: [],
            info: [],
          },
          {
            id: "D3",
            name: "D3",
            res: "type5",
            activate: [],
            info: [],
          },
          {
            id: "F3",
            name: "F3",
            res: "type6",
            activate: [],
            info: [],
          },
          {
            id: "G03",
            name: "G03",
            res: "type7",
            activate: [],
            info: [],
          },
          {
            id: "G3",
            name: "G3",
            res: "type8",
            activate: [],
            info: [],
          },
        ],
        //6,piano
        [
          {
            id: "Plucks1",
            name: "Plucks 1",
            res: "type1",
            activate: [],
            info: [],
          },
          {
            id: "Plucks2",
            name: "Plucks 2",
            res: "type2",
            activate: [],
            info: [],
          },
          {
            id: "Plucks3",
            name: "Plucks 3",
            res: "type3",
            activate: [],
            info: [],
          },
          {
            id: "Plucks4",
            name: "Plucks 4",
            res: "type4",
            activate: [],
            info: [],
          },
          {
            id: "Plucks5",
            name: "Plucks 5",
            res: "type5",
            activate: [],
            info: [],
          },
          {
            id: "Plucks6",
            name: "Plucks 6",
            res: "type6",
            activate: [],
            info: [],
          },
          {
            id: "Plucks7",
            name: "Plucks 7",
            res: "type7",
            activate: [],
            info: [],
          },
          {
            id: "Plucks8",
            name: "Plucks 8",
            res: "type8",
            activate: [],
            info: [],
          },
        ],
        //7,guitar
        [
          {
            id: "Plucks1",
            name: "Plucks 1",
            res: "type1",
            activate: [],
            info: [],
          },
          {
            id: "Plucks2",
            name: "Plucks 2",
            res: "type2",
            activate: [],
            info: [],
          },
          {
            id: "Plucks3",
            name: "Plucks 3",
            res: "type3",
            activate: [],
            info: [],
          },
          {
            id: "Plucks4",
            name: "Plucks 4",
            res: "type4",
            activate: [],
            info: [],
          },
          {
            id: "Plucks5",
            name: "Plucks 5",
            res: "type5",
            activate: [],
            info: [],
          },
          {
            id: "Plucks6",
            name: "Plucks 6",
            res: "type6",
            activate: [],
            info: [],
          },
          {
            id: "Plucks7",
            name: "Plucks 7",
            res: "type7",
            activate: [],
            info: [],
          },
          {
            id: "Plucks8",
            name: "Plucks 8",
            res: "type8",
            activate: [],
            info: [],
          },
        ],
        //8,keys
        [
          {
            id: "Plucks1",
            name: "Plucks 1",
            res: "type1",
            activate: [],
            info: [],
          },
          {
            id: "Plucks2",
            name: "Plucks 2",
            res: "type2",
            activate: [],
            info: [],
          },
          {
            id: "Plucks3",
            name: "Plucks 3",
            res: "type3",
            activate: [],
            info: [],
          },
          {
            id: "Plucks4",
            name: "Plucks 4",
            res: "type4",
            activate: [],
            info: [],
          },
          {
            id: "Plucks5",
            name: "Plucks 5",
            res: "type5",
            activate: [],
            info: [],
          },
          {
            id: "Plucks6",
            name: "Plucks 6",
            res: "type6",
            activate: [],
            info: [],
          },
          {
            id: "Plucks7",
            name: "Plucks 7",
            res: "type7",
            activate: [],
            info: [],
          },
          {
            id: "Plucks8",
            name: "Plucks 8",
            res: "type8",
            activate: [],
            info: [],
          },
        ],
      ],
      tracksName: [
        //bass sfx drums synth cymbals piano guitar keys
        "bass",
        "sfx",
        "drums",
        "synth",
        "cymbals",
        "piano",
        "guitar",
        "keys",
      ],
      //bass sfx drums synth cymbals piano guitar keys
      bass: null,
      sfx: null,
      drums: null,
      synth: null,
      cymbals: null,
      piano: null,
      guitar: null,
      keys: null,

      isFristTracks: true,
      showTracks: 0,

      countWidth: 0,
      totalWidth: 0,
      lastWidth: 0,
      showNftInfo: false,

      mapCountWidth: 0,
      mapTotalWidth: 0,
      mapLastWidth: 0,

      screenWidth: document.body.clientWidth,

      percentV: 0,

      minute: 0,
      second: 0,

      numCountWidth: 0,
    };
  },
  computed: {
    instruments() {
      //bass sfx drums synth cymbals piano guitar keys
      return [
        this.bass,
        this.sfx,
        this.drums,
        this.synth,
        this.cymbals,
        this.piano,
        this.guitar,
        this.keys,
      ];
    },
  },
  async created() {
    let g = this;
    document.onkeydown = function (event) {
      //Spacebar control pause or start
      let key = event.code;
      if (key === "Space") {
        //Remove the screen scrolling function when pressing the spacebar
        var e = window.event || event;
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          window.event.returnValue = false;
        }

        g.startSound();
      }
    };
  },
  mounted() {
    this.init();

    //Get the total width and visual width of the music lattice
    let scrollWidth = this.$refs.listContainer.scrollWidth;
    let viewWidth = $(".trackNodeList").width();
    this.countWidth = scrollWidth - viewWidth;
    console.log(this.countWidth);

    //numContainer
    // let numScrollWidth = this.$refs.numContainer.scrollWidth;
    // let numViewWidth = $(".trackNodeList").width();
    // this.numCountWidth = numScrollWidth - numViewWidth;
    // console.log(this.numCountWidth);

    //Get the total width and visual width of the music lattice of the mini map
    let mapScrollWidth = this.$refs.mapListContainer.scrollWidth;
    let mapViewWidth = $(".mapListInfo").width();
    this.mapCountWidth = mapScrollWidth - mapViewWidth;
    console.log(this.mapCountWidth);
  },
  watch: {
    //bpm When changes occur
    bpm: {
      handler: function (val, oldVal) {
        Tone.Transport.bpm.value = this.bpm;
      },
    },
    //notevalue When changes occur
    notevalue: {
      handler: function (val, oldVal) {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        Tone.Loop.interval = this.notevalue + "n";
        this.playing = false;
        // this.$forceUpdate();
      },
    },
  },
  methods: {
    check(track, index) {
      let a = track.find((item) => {
        return item.activate[index] == true;
      });
      return a != undefined;
    },

    toggleActivate: function (track, index, n) {
      const that = this;
      return () => {
        track.activate[n - 1] = !track.activate[n - 1];
        this.$forceUpdate();
      };
    },
    //Play specified music
    addMusic(index, e) {
      let player = new Tone.Player().toDestination();
      player.buffer = this.instruments[index].get(e);
      // console.log("player", player);
      player.start();
    },
    //Play music
    async startSound() {
      if (!this.playing) {
        Tone.start();
        this.loop = new Tone.Loop((time) => {
          Tone.Draw.schedule(() => {
            this.current++;
            this.getTime(this.current);
            this.getRollView();
            this.percent();
            if (this.current > this.notevalue) this.current = 1;
            for (let j = 0; j < this.tracks.length; j++) {
              for (let i = 0; i < this.tracks[j].length; i++) {
                if (this.tracks[j][i].activate[this.current - 1]) {
                  this.addMusic(j, this.tracks[j][i].res);
                }
              }
            }
          }, time);
        }, this.notevalue + "n").start(0);

        Tone.Transport.bpm.value = 960 / this.notevalue;
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
        Tone.Transport.cancel();
      }
      this.playing = !this.playing;
    },

    //Time on the mini map
    getTime(index) {
      if (this.minute === 8) {
        this.minute = 0;
        this.second = 0;
      }
      if (this.second === 60) {
        this.minute++;
        this.second = 0;
      }
      if (index % 2 === 0) {
        this.second++;
      }
    },

    //Time conversion display format
    getShowTime() {
      let minute = this.minute;
      let second = this.second;
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return minute + " : " + second;
    },

    //Mini map scroll bar
    percent() {
      if (this.percentV < 96) {
        this.percentV = this.percentV + 0.1;
        this.$refs.progress.style.width = this.percentV + "%";
        this.$refs.progressBtn.style.left = this.percentV - 2 + "%";
      } else {
        this.percentV = 0 + 0.1;
        this.$refs.progress.style.width = 0 + "%";
        this.$refs.progressBtn.style.left = 0 - 2 + "%";
      }
    },

    //Replay
    resetM() {
      this.current = -1;
      Tone.Transport.stop();
      Tone.Transport.cancel();
      this.playing = false;

      this.totalWidth = 0;
      $(".listInfo").css("transform", `translateX(-${this.totalWidth}px)`);
      //num
      $(".sc-Num").css("transform", `translateX(-${this.totalWidth}px)`);

      this.minute = 0;
      this.second = 0;
      this.getTime(-1);

      this.percentV = 0 + 0.1;
      this.$refs.progress.style.width = 0 + "%";
      this.$refs.progressBtn.style.left = 0 - 2 + "%";
    },

    init: function () {
      //bass sfx drums synth cymbals piano guitar keys
      this.bass = new Tone.ToneAudioBuffers({
        urls: {
          type1: "drums/Kick1-C.wav",
          type2: "drums/Kick2-D.wav",
          type3: "drums/Percussion1.wav",
          type4: "drums/Percussion2.wav",
          type5: "drums/RimshotSnare1.wav",
          type6: "drums/RimshotSnare2.wav",
          type7: "drums/Snare1-F.wav",
          type8: "drums/Snare2-A.wav",
        },
        onload: () => console.log("bass loaded"),
        baseUrl: "/music/",
      });
      this.sfx = new Tone.ToneAudioBuffers({
        urls: {
          type1: "cymbals/ClosedHihat1.wav",
          type2: "cymbals/ClosedHihat2.wav",
          type3: "cymbals/Crash1.wav",
          type4: "cymbals/Crash2.wav",
          type5: "cymbals/OpenHihat1.wav",
          type6: "cymbals/OpenHihat2.wav",
          type7: "cymbals/Ride1.wav",
          type8: "cymbals/Ride2.wav",
        },
        onload: () => console.log("sfx loaded"),
        baseUrl: "/music/",
      });
      this.drums = new Tone.ToneAudioBuffers({
        urls: {
          type1: "drums/Kick1-C.wav",
          type2: "drums/Kick2-D.wav",
          type3: "drums/Percussion1.wav",
          type4: "drums/Percussion2.wav",
          type5: "drums/RimshotSnare1.wav",
          type6: "drums/RimshotSnare2.wav",
          type7: "drums/Snare1-F.wav",
          type8: "drums/Snare2-A.wav",
        },
        onload: () => console.log("drums loaded"),
        baseUrl: "/music/",
      });
      this.synth = new Tone.ToneAudioBuffers({
        urls: {
          type1: "piano/A03.wav",
          type2: "piano/C3.wav",
          type3: "piano/C4.wav",
          type4: "piano/D03.wav",
          type5: "piano/D3.wav",
          type6: "piano/F3.wav",
          type7: "piano/G03.wav",
          type8: "piano/G3.wav",
        },
        onload: () => console.log("synth loaded"),
        baseUrl: "/music/",
      });
      this.cymbals = new Tone.ToneAudioBuffers({
        urls: {
          type1: "cymbals/ClosedHihat1.wav",
          type2: "cymbals/ClosedHihat2.wav",
          type3: "cymbals/Crash1.wav",
          type4: "cymbals/Crash2.wav",
          type5: "cymbals/OpenHihat1.wav",
          type6: "cymbals/OpenHihat2.wav",
          type7: "cymbals/Ride1.wav",
          type8: "cymbals/Ride2.wav",
        },
        onload: () => console.log("cymbals loaded"),
        baseUrl: "/music/",
      });
      this.piano = new Tone.ToneAudioBuffers({
        urls: {
          type1: "piano/A03.wav",
          type2: "piano/C3.wav",
          type3: "piano/C4.wav",
          type4: "piano/D03.wav",
          type5: "piano/D3.wav",
          type6: "piano/F3.wav",
          type7: "piano/G03.wav",
          type8: "piano/G3.wav",
        },
        onload: () => console.log("piano loaded"),
        baseUrl: "/music/",
      });
      this.guitar = new Tone.ToneAudioBuffers({
        urls: {
          type1: "drums/Kick1-C.wav",
          type2: "drums/Kick2-D.wav",
          type3: "drums/Percussion1.wav",
          type4: "drums/Percussion2.wav",
          type5: "drums/RimshotSnare1.wav",
          type6: "drums/RimshotSnare2.wav",
          type7: "drums/Snare1-F.wav",
          type8: "drums/Snare2-A.wav",
        },
        onload: () => console.log("guitar loaded"),
        baseUrl: "/music/",
      });
      this.keys = new Tone.ToneAudioBuffers({
        urls: {
          type1: "cymbals/ClosedHihat1.wav",
          type2: "cymbals/ClosedHihat2.wav",
          type3: "cymbals/Crash1.wav",
          type4: "cymbals/Crash2.wav",
          type5: "cymbals/OpenHihat1.wav",
          type6: "cymbals/OpenHihat2.wav",
          type7: "cymbals/Ride1.wav",
          type8: "cymbals/Ride2.wav",
        },
        onload: () => console.log("keys loaded"),
        baseUrl: "/music/",
      });
    },

    //Display grid details
    mouseOverNode(name, id, isCheck) {
      if (isCheck === true) {
        this.showNftInfo = true;
      }
    },
    mouseLeaveNode(name, id, isCheck) {
      if (isCheck === true) {
        this.showNftInfo = false;
      }
    },

    //Click the map to scroll left and right
    rollData(type) {
      if (type === "next") {
        if (this.totalWidth + 800 > this.countWidth) {
          this.lastWidth = this.countWidth - this.totalWidth;
          this.totalWidth = this.countWidth;
        } else {
          this.totalWidth = this.totalWidth + 800;
        }
        $(".listInfo")
          .css("transform", `translateX(-${this.totalWidth}px)`)
          .css("transition-duration", "2s");
        //num
        $(".sc-Num")
          .css("transform", `translateX(-${this.totalWidth}px)`)
          .css("transition-duration", "2s");
      } else {
        if (this.totalWidth != 0) {
          if (this.totalWidth === this.countWidth) {
            this.totalWidth = this.totalWidth - this.lastWidth;
          } else {
            this.totalWidth = this.totalWidth - 800;
          }
          $(".listInfo")
            .css("transform", `translateX(-${this.totalWidth}px)`)
            .css("transition-duration", "2s");
          //num
          $(".sc-Num")
            .css("transform", `translateX(-${this.totalWidth}px)`)
            .css("transition-duration", "2s");
        }
      }
    },

    //Map follow scroll
    getRollView() {
      let viewWidth = $(".trackNodeList").width();
      let activeLeft = $(".active").offset().left;
      let distance = parseInt(viewWidth) - parseInt(activeLeft);
      if (distance < 100) {
        this.rollData("next");
      }
    },

    //Click the minimap to scroll left and right
    mapRollData(type) {
      if (type === "next") {
        if (this.mapTotalWidth + 150 > this.mapCountWidth) {
          this.mapLastWidth = this.mapCountWidth - this.mapTotalWidth;
          this.mapTotalWidth = this.mapCountWidth;
        } else {
          this.mapTotalWidth = this.mapTotalWidth + 150;
        }
        $(".mapInfo")
          .css("transform", `translateX(-${this.mapTotalWidth}px)`)
          .css("transition-duration", "2s");
      } else {
        if (this.mapTotalWidth != 0) {
          if (this.mapTotalWidth === this.mapCountWidth) {
            this.mapTotalWidth = this.mapTotalWidth - this.mapLastWidth;
          } else {
            this.mapTotalWidth = this.mapTotalWidth - 150;
          }
          $(".mapInfo")
            .css("transform", `translateX(-${this.mapTotalWidth}px)`)
            .css("transition-duration", "2s");
        }
      }
    },

    //
    getShowTracks(index, status) {
      this.showTracks = index;
      this.isFristTracks = status;
      if (index !== -1) {
        $(".changeImg").css("height", "990px");
      } else {
        $(".changeImg").css("height", "628px");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/style.scss";
</style>

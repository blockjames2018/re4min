<template >
  <div class="drum">
    <main>
      <div class="container">
        <div class="bracket1">
          <div class="player_container">
            <div class="player">
              <div v-touch:tap="startSound">
                <img src="img/Play.png" v-show="!playing" />
                <img src="img/Pause.png" v-show="playing" />
              </div>
            </div>
            <div class="mapListInfo">
              <el-slider
                v-model="progressValue"
                :show-tooltip="false"
                @change="changeProgress()"
              ></el-slider>
            </div>
          </div>
        </div>
        <div class="nodeNumList">
          <div class="numListCont">
            <div class="jKNSgD">
              <div class="jkaEgP">
                <div class="jkdwEk">
                  <span class="sc-cSHVUG cYSnRy"></span>
                </div>
              </div>
            </div>
            <div class="tickerNumList">
              <div class="tickerNum">
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
          </div>
        </div>
        <div class="trackcontainer">
          <div class="trackNodeName">
            <div v-for="(track, index) in tracks" class="track" :key="index">
              <div v-if="showTracks == index && !isFristTracks">
                <div class="track_flex track_Icon" @click="getShowTracks(-1)">
                  <img :src="'img/' + tracksName[index] + 'Ic.png'" />
                </div>
                <div class="closeIcon" @click="getShowTracks(-1)">
                  <img src="img/close.png" />
                </div>
              </div>
              <div
                v-else
                @click="getShowTracks(index, false)"
                class="track_flex track_Icon"
              >
                <img :src="'img/' + tracksName[index] + 'Ic.png'" />
              </div>
            </div>
          </div>
          <div class="trackNodeList" ref="listContainer">
            <div class="listInfo">
              <div v-for="(track, index) in tracks" class="track" :key="index">
                <div v-if="showTracks == index && !isFristTracks">
                  <div class="track_flex">
                    <div
                      :class="{
                        block: true,
                        active: n == current,
                        bass: tracksName[index] === 'bass',
                        bass_check:
                          check(track, n - 1) && tracksName[index] === 'bass',
                        pad: tracksName[index] === 'pad',
                        pad_check:
                          check(track, n - 1) && tracksName[index] === 'pad',
                        drums: tracksName[index] === 'drums',
                        drums_check:
                          check(track, n - 1) && tracksName[index] === 'drums',
                        synth: tracksName[index] === 'synth',
                        synth_check:
                          check(track, n - 1) && tracksName[index] === 'synth',
                        cymbals: tracksName[index] === 'cymbals',
                        cymbals_check:
                          check(track, n - 1) &&
                          tracksName[index] === 'cymbals',
                        piano: tracksName[index] === 'piano',
                        piano_check:
                          check(track, n - 1) && tracksName[index] === 'piano',
                        guitar: tracksName[index] === 'guitar',
                        guitar_check:
                          check(track, n - 1) && tracksName[index] === 'guitar',
                        lead: tracksName[index] === 'lead',
                        lead_check:
                          check(track, n - 1) && tracksName[index] === 'lead',
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
                        bass_check:
                          tracker.activate[n - 1] &&
                          tracksName[index] === 'bass',
                        pad: tracksName[index] === 'pad',
                        pad_check:
                          tracker.activate[n - 1] &&
                          tracksName[index] === 'pad',
                        drums: tracksName[index] === 'drums',
                        drums_check:
                          tracker.activate[n - 1] &&
                          tracksName[index] === 'drums',
                        synth: tracksName[index] === 'synth',
                        synth_check:
                          tracker.activate[n - 1] &&
                          tracksName[index] === 'synth',
                        cymbals: tracksName[index] === 'cymbals',
                        cymbals_check:
                          tracker.activate[n - 1] &&
                          tracksName[index] === 'cymbals',
                        piano: tracksName[index] === 'piano',
                        piano_check:
                          tracker.activate[n - 1] &&
                          tracksName[index] === 'piano',
                        guitar: tracksName[index] === 'guitar',
                        guitar_check:
                          tracker.activate[n - 1] &&
                          tracksName[index] === 'guitar',
                        lead: tracksName[index] === 'lead',
                        lead_check:
                          tracker.activate[n - 1] &&
                          tracksName[index] === 'lead',
                      }"
                      :key="n + 's'"
                      v-for="n in parseInt(notevalue)"
                      :id="tracker.id + n"
                      @click="
                        addMusicOne(
                          tracker.activate[n - 1],
                          showTracks,
                          tracker.res
                        )
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
                      active: n == current,
                      bass: tracksName[index] === 'bass',
                      bass_check:
                        check(track, n - 1) && tracksName[index] === 'bass',
                      pad: tracksName[index] === 'pad',
                      pad_check:
                        check(track, n - 1) && tracksName[index] === 'pad',
                      drums: tracksName[index] === 'drums',
                      drums_check:
                        check(track, n - 1) && tracksName[index] === 'drums',
                      synth: tracksName[index] === 'synth',
                      synth_check:
                        check(track, n - 1) && tracksName[index] === 'synth',
                      cymbals: tracksName[index] === 'cymbals',
                      cymbals_check:
                        check(track, n - 1) && tracksName[index] === 'cymbals',
                      piano: tracksName[index] === 'piano',
                      piano_check:
                        check(track, n - 1) && tracksName[index] === 'piano',
                      guitar: tracksName[index] === 'guitar',
                      guitar_check:
                        check(track, n - 1) && tracksName[index] === 'guitar',
                      lead: tracksName[index] === 'lead',
                      lead_check:
                        check(track, n - 1) && tracksName[index] === 'lead',
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
      //bass pad drums synth cymbals piano guitar lead
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
        //2,pad
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
        //8,lead
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
        //bass pad drums synth cymbals piano guitar lead
        "bass",
        "pad",
        "drums",
        "synth",
        "cymbals",
        "piano",
        "guitar",
        "lead",
      ],
      //bass pad drums synth cymbals piano guitar lead
      bass: null,
      pad: null,
      drums: null,
      synth: null,
      cymbals: null,
      piano: null,
      guitar: null,
      lead: null,

      isFristTracks: true,
      showTracks: 0,

      countWidth: 0,
      totalWidth: 0,
      lastWidth: 0,
      showNftInfo: false,

      progressValue: 0,
    };
  },
  computed: {
    instruments() {
      //bass pad drums synth cymbals piano guitar lead
      return [
        this.bass,
        this.pad,
        this.drums,
        this.synth,
        this.cymbals,
        this.piano,
        this.guitar,
        this.lead,
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
    //Play specified music
    addMusicOne(check, index, e) {
      if (check) {
        let player = new Tone.Player().toDestination();
        player.buffer = this.instruments[index].get(e);
        // console.log("player", player);
        player.start();
      }
    },
    //Play music
    async startSound() {
      if (!this.playing) {
        Tone.start();
        this.loop = new Tone.Loop((time) => {
          Tone.Draw.schedule(() => {
            console.log("--------" + this.current);
            this.current++;
            if (this.current > this.notevalue) this.current = 1;
            for (let j = 0; j < this.tracks.length; j++) {
              for (let i = 0; i < this.tracks[j].length; i++) {
                if (this.tracks[j][i].activate[this.current - 1]) {
                  this.addMusic(j, this.tracks[j][i].res);
                }
              }
            }
            this.getRollView();
            this.percent();
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

    //Mini map scroll bar
    percent() {
      let val = 100 / 960;
      if (this.progressValue <= 100) {
        this.progressValue = this.progressValue + val;
      } else {
        this.progressValue = 0;
      }
    },

    //Positioning when dragging the scroll bar
    changeProgress() {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      this.playing = false;
      let num = this.countWidth / 100;
      let val = num * this.progressValue;
      this.totalWidth = val;
      $(".listInfo")
        .css("transform", `translateX(-${this.totalWidth}px)`)
        .css("transition-duration", "2s");
      $(".tickerNum")
        .css("transform", `translateX(-${this.totalWidth}px)`)
        .css("transition-duration", "2s");
      this.current = parseInt(this.totalWidth / 102);

      console.log(this.current);
    },

    init: function () {
      //bass pad drums synth cymbals piano guitar lead
      this.bass = new Tone.ToneAudioBuffers({
        urls: {
          type1: "bass/C3.wav",
          type2: "bass/A02.wav",
          type3: "bass/G02.wav",
          type4: "bass/G2.wav",
          type5: "bass/F2.wav",
          type6: "bass/D02.wav",
          type7: "bass/D2.wav",
          type8: "bass/C2.wav",
        },
        onload: () => console.log("bass loaded"),
        baseUrl: "/music/",
      });
      this.pad = new Tone.ToneAudioBuffers({
        urls: {
          type1: "pad/C4.wav",
          type2: "pad/A03.wav",
          type3: "pad/G03.wav",
          type4: "pad/G3.wav",
          type5: "pad/F3.wav",
          type6: "pad/D03.wav",
          type7: "pad/D3.wav",
          type8: "pad/C3.wav",
        },
        onload: () => console.log("pad loaded"),
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
          type1: "synth/C3.wav",
          type2: "synth/A02.wav",
          type3: "synth/G02.wav",
          type4: "synth/G2.wav",
          type5: "synth/F2.wav",
          type6: "synth/D02.wav",
          type7: "synth/D2.wav",
          type8: "synth/C2.wav",
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
          type1: "piano/C4.wav",
          type2: "piano/A03.wav",
          type3: "piano/G03.wav",
          type4: "piano/G3.wav",
          type5: "piano/F3.wav",
          type6: "piano/D03.wav",
          type7: "piano/D3.wav",
          type8: "piano/C3.wav",
        },
        onload: () => console.log("piano loaded"),
        baseUrl: "/music/",
      });
      this.guitar = new Tone.ToneAudioBuffers({
        urls: {
          type1: "guitar/C3.wav",
          type2: "guitar/A02.wav",
          type3: "guitar/G02.wav",
          type4: "guitar/G2.wav",
          type5: "guitar/F2.wav",
          type6: "guitar/D02.wav",
          type7: "guitar/D2.wav",
          type8: "guitar/C2.wav",
        },
        onload: () => console.log("guitar loaded"),
        baseUrl: "/music/",
      });
      this.lead = new Tone.ToneAudioBuffers({
        urls: {
          type1: "lead/C3.wav",
          type2: "lead/A02.wav",
          type3: "lead/G02.wav",
          type4: "lead/G2.wav",
          type5: "lead/F2.wav",
          type6: "lead/D02.wav",
          type7: "lead/D2.wav",
          type8: "lead/C2.wav",
        },
        onload: () => console.log("lead loaded"),
        baseUrl: "/music/",
      });
    },

    //Click the map to scroll left and right
    rollData(type) {
      if (type === "next") {
        if (this.totalWidth + 1020 > this.countWidth) {
          this.lastWidth = this.countWidth - this.totalWidth;
          this.totalWidth = this.countWidth;
        } else {
          this.totalWidth = this.totalWidth + 1020;
        }
        $(".listInfo")
          .css("transform", `translateX(-${this.totalWidth}px)`)
          .css("transition-duration", "2s");
        $(".tickerNum")
          .css("transform", `translateX(-${this.totalWidth}px)`)
          .css("transition-duration", "2s");
      } else {
        if (this.totalWidth != 0) {
          if (this.totalWidth === this.countWidth) {
            this.totalWidth = this.totalWidth - this.lastWidth;
          } else {
            this.totalWidth = this.totalWidth - 1020;
          }
          $(".listInfo")
            .css("transform", `translateX(-${this.totalWidth}px)`)
            .css("transition-duration", "2s");
          $(".tickerNum")
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

    //
    getShowTracks(index, status) {
      this.showTracks = index;
      this.isFristTracks = status;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/style.scss";
</style>

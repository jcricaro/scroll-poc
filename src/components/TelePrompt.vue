<template>
    <div class="column justify-center items-center q-mt-xl">
        <q-btn
            flat
            color="amber-12"
            size="lg"
            :label="scroll.isPlaying ? 'Pause' : 'Play'"
            :icon="scroll.isPlaying ? 'pause' : 'play_arrow'"
            @click="scroll.isPlaying ? pause() : play()"
        />
        <div
            ref="container"
            style="max-height: 500px; overflow-y: scroll;"
            class="text-h4 q-mt-xl full-width"
        >
            <p
                v-for="(sentence, index) in paragraphs"
                :key="index"
                v-text="sentence"
                class="q-mt-xl"
            >
            </p>
        </div>
        <div class="q-mt-xl">
            <span>
                x{{ scroll.speed }} speed
            </span>
        </div>
        <div>
            <div class="column">
                <div>
                    <q-badge color="grey-7">
                        <q-icon name="keyboard_arrow_up"></q-icon>
                    </q-badge>
                    - Speed Up
                </div>
                <div>
                    <q-badge color="grey-7">
                        <q-icon name="keyboard_arrow_down"></q-icon>
                    </q-badge>
                    - Slow Down
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ScrollTracker from './../utils/scrollTracker'
import { debounce } from 'quasar'
export default {
    name: 'TelePrompt',
    props: {
        text: {
            type: String,
            default: () => ''
        }
    },
    data: () => ({
        scroll: new ScrollTracker({
            speed: 1,
            finished: () => {
                console.log('finished')
            }
        }),
        speeds: [1, 1.5, 2, 3, 5, 10, 50]
    }),
    mounted() {
        this.$nextTick(() => {
            this.scroll.el = this.$refs.container
            document.addEventListener('keydown', debounce(this.keyPressHandler, 200))
        })
    },
    beforeDestroy() {
        document.removeEventListener('keydown', debounce(this.keyPressHandler, 200))
    },
    computed: {
        paragraphs() {
            return this.text.split('\n')
        }
    },
    methods: {
        speedUp() {
            this.pause()
            setTimeout(() => {
                    this.scroll.speed = this.speeds[this.speeds.indexOf(this.scroll.speed) + 1]
                    this.play()
            }, 100);
        },
        slowDown() {
            this.pause()
            setTimeout(() => {
                this.scroll.speed = this.speeds[this.speeds.indexOf(this.scroll.speed) - 1]
                this.play()
            },  100);
        },
        keyPressHandler(event) {
            switch(event.key) {
                case 'ArrowUp':
                    if (this.speeds.length > this.speeds.indexOf(this.scroll.speed) + 1)
                        this.speedUp()
                    break;
                case 'ArrowDown':
                    if (this.speeds.indexOf(this.scroll.speed) > 0)
                        this.slowDown()
                    break;
            }
        },
        pause() {
            this.scroll.pause()
        },
        reset() {
            this.scroll.isPlaying = false
        },
        play() {
            this.scroll.play()
        }
    }
}
</script>
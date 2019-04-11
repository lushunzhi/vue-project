Vue.component("input-number", {
    template: "<div class=\"input-number\">\n" +
        "<input type=\"text\" :value=\"currentValue\" @change=\"handleChange\">\n" +
        "<button @click=\"handleDown\" :disable=\"currentValue <= min\">-</button>\n" +
        "<button @click=\"handleUp\" :disable=\"currentValue >= max\">+</button>\n" +
        "</div>",
    props: {  // 用法：https://cn.vuejs.org/v2/api/#props(官方)；https://blog.csdn.net/jingtian678/article/details/81160995(博客)
        max: {
            type: Number,
            default: Infinity   //正无穷
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        console.log("this.value ==>: " + this.value);
        return {currentValue: this.value};
    },
    watch:{ // watch解释和用法：https://www.imooc.com/article/70010?block_id=tuijian_wz
        currentValue:function (val) {
            this.$emit("input", val);  // $emit用法：https://www.cnblogs.com/mophy/p/8630953.html
            this.$emit("on-change", val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods:{
        handleDown:function () {
            console.log("handleDown ==>:" + this.currentValue);
            console.log("handleDown this.min==>:" + this.min);
            if (this.currentValue <= this.min) return;
                this.currentValue -= 1;
        },
        handleUp:function () {
            if (this.currentValue >= this.max) return;
            this.currentValue += 1;
        },
        updateValue:function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleChange:function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }
        },
    },
    mounted:function () {
        this.updateValue(this.value);
    }
});

function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[0-9][0-9]*$)|(^-?0{1}$)/).test(value + "");
}
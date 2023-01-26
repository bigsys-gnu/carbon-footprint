<template>
  <div>
    <tree :config="config" :nodes="nodes"> </tree>
    <div></div>
  </div>
</template>

<script>
import treeview from "vue3-treeview";
import "vue3-treeview/dist/style.css";

export default {
  components: {
    tree: treeview,
  },
  data: function () {
    return {
      nodes: {
        id1: {
          text: "text1",
          children: ["id11", "id12"],
          something:"adwdaw"
        },
        id11: {
          text: "text11 not dropable",
          state: {
            dropable: false,
          },
        },
        id12: {
          text: "text12 not draggable",
          state: {
            draggable: false,
          },
        },
        id2: {
          text: "text2",
          children: ["id21", "id22"],
        },
        id21: {
          text: "text21",
        },
        id22: {
          text: "text22",
        },
        id3: {
          text: "id3 not dropable",
          state: {
            droppable: false,
          },
        },
      },
      config: {
        roots: ["id1", "id2", "id3"],
        dragAndDrop: true,
      },
    };
  },
};
</script>


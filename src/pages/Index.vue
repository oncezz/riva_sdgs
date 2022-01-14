<template>
  <q-page class="row" style="background-color: #f2f2f2; padding-bottom: 100px;">
    <!-- Regional Integration -->
    <div class="col-12 row q-pa-sm bg-white">
      <div class="col-4 self-center q-pa-xs">
        <q-img
          src="../../public/images/1.png"
          style="height: calc(50vh - 80px); object-fit: cover;"
        ></q-img>
      </div>

      <div class="col-8 row q-pa-md q-py-md">
        <div class="col-12 q-mb-md q-pt-md q-pl-md">
          <span class="text-h4 text-bold">Regional Integration</span>
          <div class="q-mt-xs font-content">
            <span>
              ESCAP DigiSRII provides insights on the structure and progress of
              regional integration in Asia-Pacific
            </span>
          </div>
        </div>
        <div class="col-4" align="center">
          <q-btn
            class="bg4 text-white q-mr-sm q-mt-sm q-py-xs font-content"
            style="border-radius: 10px; width: 200px;"
            label="Get started"
            disable
            no-caps
          ></q-btn>
        </div>
        <div class="col-4" align="center">
          <q-btn
            class="bg4 text-white q-mr-sm q-mt-sm q-py-xs font-content"
            style="border-radius: 10px; width: 200px;"
            label="Download data"
            disable
            no-caps
          ></q-btn>
        </div>
      </div>
    </div>

    <!-- Global value chains -->
    <div class="col-12 row q-pa-sm bg-white" style="margin-top: 10px;">
      <div class="col-4 self-center q-pa-xs">
        <q-img
          src="../../public/test.png"
          style="height: calc(50vh - 80px); object-fit: cover;"
        ></q-img>
      </div>

      <div class="col-8 row q-pa-md q-py-md">
        <div class="col-12 q-mb-md q-pt-md q-pl-md">
          <span class="text-h4 text-bold">Global value chains</span>
          <div class="q-mt-xs font-content">
            <span>
              Gain insight into your economy's participation in GVCs. Uncover
              the sources of intermediate inputs and the destinations of
              domestic value-added.
            </span>
          </div>
        </div>
        <div class="col-4" align="center">
          <q-btn
            class="bg4 text-white q-mr-sm q-mt-sm q-py-xs font-content"
            style="border-radius: 10px; width: 200px;"
            label="Get started"
            no-caps
            to="/gvc-links"
          ></q-btn>
        </div>
        <div class="col-4" align="center">
          <q-btn
            class="bg4 text-white q-mr-sm q-mt-sm q-py-xs font-content"
            style="border-radius: 10px; width: 200px;"
            label="Download data"
            no-caps
            to="/download"
          ></q-btn>
        </div>
        <div class="col-4" align="center">
          <q-btn
            class="bg4 text-white q-mr-sm q-mt-sm q-py-xs font-content"
            style="border-radius: 10px; width: 200px;"
            label="Country briefs"
            no-caps
            to="countrybriefs"
          ></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
<style>
/* .heightDiv {
  height: calc(50vh - 50px);
} */

.test {
  border: 1px solid;
}
</style>

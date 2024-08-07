<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <slot name="thead"></slot>
      </thead>
      <tbody class="table-group-divider" id="content">
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

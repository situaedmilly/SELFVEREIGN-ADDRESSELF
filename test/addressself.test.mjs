import assert from "node:assert/strict";
import test from "node:test";
import { whereIs, resolve, childrenOf, parentOf, createChild } from "../src/addressself.mjs";

const tree = {
  root: { node_id: "ROOT", kind: "NETWORK_ENDPOINT", address: "192.168.12.112", parent_id: null, children: ["SSH"] },
  nodes: [{ node_id: "SSH", kind: "SERVICE_ENDPOINT", address: "192.168.12.112:22", parent_id: "ROOT", children: [] }]
};

test("WHERE_IS resolves node_id and address", () => {
  assert.equal(whereIs(tree, "ROOT").address, "192.168.12.112");
  assert.equal(resolve(tree, "192.168.12.112:22").node_id, "SSH");
});

test("children and parent traversal are symmetric", () => {
  assert.equal(childrenOf(tree, "ROOT")[0].node_id, "SSH");
  assert.equal(parentOf(tree, "SSH").node_id, "ROOT");
});

test("CREATE_CHILD mutates the parent-child edge", () => {
  createChild(tree, "SSH", {
    node_id: "SSH-ROUTE",
    kind: "ROUTE",
    address: "ssh://192.168.12.112:22/example",
    parent_id: "SSH"
  });
  assert.equal(childrenOf(tree, "SSH")[0].node_id, "SSH-ROUTE");
  assert.equal(parentOf(tree, "SSH-ROUTE").node_id, "SSH");
});

test("CREATE_CHILD rejects an invalid parent", () => {
  assert.throws(() => createChild(tree, "MISSING", {
    node_id: "X", kind: "ROUTE", address: "x", parent_id: "MISSING"
  }), /PARENT_NOT_FOUND/);
});

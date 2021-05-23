package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type Item struct {
	Group    string `json:"group"`
	Variable int    `json:"variable"`
	Value    string `json:"value"`
}

func main() {
	letras := []string{"A", "B", "C", "D"}

	var items []Item

	for _, item := range letras {
		for idx := range letras {
			it := Item{
				Group:    item,
				Variable: idx + 1,
				Value:    fmt.Sprintf("%s%d", item, idx+1),
			}
			items = append(items, it)
		}
	}

	file, _ := json.MarshalIndent(items, "", " ")

	_ = ioutil.WriteFile("data.json", file, 0644)
}

package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"time"
)

type Item struct {
	Group    string `json:"group"`
	Variable int    `json:"variable"`
	Value    string `json:"value"`
}

func gerarNumerosMegaSena() []int {
	rand.Seed(time.Now().UnixNano())
	var arr []int

	for len(arr) < 6 {
		value := rand.Intn(100-1) + 1

		for i := range arr {
			if i == value {
				break
			}
		}

		arr = append(arr, value)
	}

	return arr
}

func main() {
	letras := []string{"A", "B", "C", "D"}

	num := gerarNumerosMegaSena()
	fmt.Println("Mega sena: ", num)

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

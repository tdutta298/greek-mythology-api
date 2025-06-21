import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'heroes_details.dart';

class HeroesListPage extends StatefulWidget {
  const HeroesListPage({super.key});

  @override
  State<HeroesListPage> createState() => _HeroesListPageState();
}

class _HeroesListPageState extends State<HeroesListPage> {
  List heroes = [];

  @override
  void initState() {
    super.initState();
    fetchHeroes();
  }

  Future<void> fetchHeroes() async {
    try {
      final response = await http.get(Uri.parse('http://192.168.1.12:3000/api/heroes'));
      if (response.statusCode == 200) {
        setState(() {
          heroes = json.decode(response.body);
        });
        // Debug: Print the first hero to check the structure
        if (heroes.isNotEmpty) {
          print('Hero data structure: ${heroes[0]}');
        }
      } else {
        throw Exception('Failed to load heroes');
      }
    } catch (e) {
      print('Error fetching heroes: $e');
    }
  }

  Future<void> deleteHero(String id) async {
    final response = await http.delete(Uri.parse('http://192.168.1.12:3000/api/heroes/$id'));
    if (response.statusCode == 200) fetchHeroes();
  }

  void showAddHeroDialog() {
    final nameController = TextEditingController();
    final heroicDeedsController = TextEditingController();
    final parentsController = TextEditingController();
    final mythsController = TextEditingController();
    final fateController = TextEditingController();

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Add a New Hero"),
        content: SingleChildScrollView(
          child: Column(
            children: [
              TextField(controller: nameController, decoration: const InputDecoration(labelText: "Name")),
              TextField(controller: heroicDeedsController, decoration: const InputDecoration(labelText: "Heroic Deeds (comma-separated)")),
              TextField(controller: parentsController, decoration: const InputDecoration(labelText: "Parentage (comma-separated)")),
              TextField(controller: mythsController, decoration: const InputDecoration(labelText: "Associated Myths (comma-separated)")),
              TextField(controller: fateController, decoration: const InputDecoration(labelText: "Fate")),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
          ElevatedButton(
            onPressed: () async {
              final newHero = {
                "name": nameController.text.trim(),
                "heroicDeeds": heroicDeedsController.text.split(',').map((e) => e.trim()).where((e) => e.isNotEmpty).toList(),
                "parentage": parentsController.text.split(',').map((e) => e.trim()).where((e) => e.isNotEmpty).toList(),
                "associatedMyths": mythsController.text.split(',').map((e) => e.trim()).where((e) => e.isNotEmpty).toList(),
                "fate": fateController.text.trim(),
              };
              
              try {
                final response = await http.post(
                  Uri.parse('http://192.168.1.12:3000/api/heroes'),
                  headers: {"Content-Type": "application/json"},
                  body: json.encode(newHero),
                );
                if (response.statusCode == 201) {
                  fetchHeroes();
                  Navigator.pop(context);
                } else {
                  print('Failed to add hero: ${response.statusCode}');
                }
              } catch (e) {
                print('Error adding hero: $e');
              }
            },
            child: const Text("Add"),
          )
        ],
      ),
    );
  }

  void showDeleteDialog(Map hero) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text("Delete ${hero['name']}?"),
        content: const Text("Are you sure you want to delete this hero?"),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            onPressed: () {
              Navigator.pop(context);
              deleteHero(hero['_id']);
            },
            child: const Text("Delete"),
          ),
        ],
      ),
    );
  }

  void showDetailsPage(Map hero) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => HeroDetailsPage(hero: hero)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.pink.shade900.withOpacity(0.1),
      appBar: AppBar(title: const Text('Greek Heroes'), backgroundColor: Colors.pink),
      body: ListView.builder(
        padding: const EdgeInsets.only(top: 20),
        itemCount: heroes.length,
        itemBuilder: (context, index) {
          final hero = heroes[index];
          return Card(
            color: Colors.pink.shade100.withOpacity(0.3),
            margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
            child: ListTile(
              title: Text(hero['name'] ?? 'Unknown Hero', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
              onTap: () => showDetailsPage(hero),
              onLongPress: () => showDeleteDialog(hero),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.pink,
        onPressed: showAddHeroDialog,
        child: const Icon(Icons.add),
      ),
    );
  }
}
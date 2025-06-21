import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'creatures_details.dart';

class CreaturesListPage extends StatefulWidget {
  const CreaturesListPage({super.key});

  @override
  State<CreaturesListPage> createState() => _CreaturesListPageState();
}

class _CreaturesListPageState extends State<CreaturesListPage> {
  List creatures = [];

  @override
  void initState() {
    super.initState();
    fetchCreatures();
  }

  Future<void> fetchCreatures() async {
    final response = await http.get(Uri.parse('http://192.168.1.12:3000/api/creatures'));
    if (response.statusCode == 200) {
      setState(() {
        creatures = json.decode(response.body);
      });
    } else {
      throw Exception('Failed to load creatures');
    }
  }

  Future<void> deleteCreature(String id) async {
    final response = await http.delete(Uri.parse('http://192.168.1.12:3000/api/creatures/$id'));
    if (response.statusCode == 200) fetchCreatures();
  }

  void showAddCreatureDialog() {
    final nameController = TextEditingController();
    final typeController = TextEditingController();
    final abilitiesController = TextEditingController();
    final originController = TextEditingController();
    final mythsController = TextEditingController();

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Add a New Creature"),
        content: SingleChildScrollView(
          child: Column(
            children: [
              TextField(controller: nameController, decoration: const InputDecoration(labelText: "Name")),
              TextField(controller: typeController, decoration: const InputDecoration(labelText: "Type")),
              TextField(controller: abilitiesController, decoration: const InputDecoration(labelText: "Abilities (comma-separated)")),
              TextField(controller: originController, decoration: const InputDecoration(labelText: "Origin")),
              TextField(controller: mythsController, decoration: const InputDecoration(labelText: "Associated Myths (comma-separated)")),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
          ElevatedButton(
            onPressed: () async {
              final newCreature = {
                "name": nameController.text,
                "type": typeController.text,
                "abilities": abilitiesController.text.split(',').map((e) => e.trim()).toList(),
                "origin": originController.text,
                "associatedMyths": mythsController.text.split(',').map((e) => e.trim()).toList(),
              };
              final response = await http.post(
                Uri.parse('http://192.168.1.12:3000/api/creatures'),
                headers: {"Content-Type": "application/json"},
                body: json.encode(newCreature),
              );
              if (response.statusCode == 201) {
                fetchCreatures();
                Navigator.pop(context);
              }
            },
            child: const Text("Add"),
          )
        ],
      ),
    );
  }

  void showDeleteDialog(Map creature) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text("Delete ${creature['name']}?"),
        content: const Text("Are you sure you want to delete this creature?"),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            onPressed: () {
              Navigator.pop(context);
              deleteCreature(creature['_id']);
            },
            child: const Text("Delete"),
          ),
        ],
      ),
    );
  }

  void showDetailsPage(Map creature) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => CreatureDetailsPage(creature: creature)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.orange.shade900.withOpacity(0.1),
      appBar: AppBar(title: const Text('Greek Creatures'), backgroundColor: Colors.orange),
      body: ListView.builder(
        padding: const EdgeInsets.only(top: 20),
        itemCount: creatures.length,
        itemBuilder: (context, index) {
          final creature = creatures[index];
          return Card(
            color: Colors.orange.shade100.withOpacity(0.3),
            margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
            child: ListTile(
              title: Text(creature['name'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
              onTap: () => showDetailsPage(creature),
              onLongPress: () => showDeleteDialog(creature),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.orange,
        onPressed: showAddCreatureDialog,
        child: const Icon(Icons.add),
      ),
    );
  }
}

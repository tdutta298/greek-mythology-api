import 'package:flutter/material.dart';
import 'package:frontend/screens/gods/gods_details.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class GodsListPage extends StatefulWidget {
  const GodsListPage({super.key});

  @override
  State<GodsListPage> createState() => _GodsListPageState();
}

class _GodsListPageState extends State<GodsListPage> {
  List gods = [];

  @override
  void initState() {
    super.initState();
    fetchGods();
  }

  Future<void> fetchGods() async {
    final response = await http.get(Uri.parse('http://192.168.1.12:3000/api/gods'));
    if (response.statusCode == 200) {
      setState(() {
        gods = json.decode(response.body);
      });
    } else {
      throw Exception('Failed to load gods');
    }
  }

  Future<void> deleteGod(String id) async {
    final response = await http.delete(Uri.parse('http://192.168.1.12:3000/api/gods/$id'));
    if (response.statusCode == 200) {
      fetchGods();
    } else {
      throw Exception('Failed to delete god');
    }
  }

  void showAddGodDialog() {
    final nameController = TextEditingController();
    final domainController = TextEditingController();
    final symbolsController = TextEditingController();
    final parentsController = TextEditingController();
    final romanController = TextEditingController();
    final mythsController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text("Add a New God"),
          content: SingleChildScrollView(
            child: Column(
              children: [
                TextField(controller: nameController, decoration: const InputDecoration(labelText: "Name")),
                TextField(controller: domainController, decoration: const InputDecoration(labelText: "Domain (comma-separated)")),
                TextField(controller: symbolsController, decoration: const InputDecoration(labelText: "Symbols (comma-separated)")),
                TextField(controller: parentsController, decoration: const InputDecoration(labelText: "Parents (comma-separated)")),
                TextField(controller: romanController, decoration: const InputDecoration(labelText: "Roman Equivalent")),
                TextField(controller: mythsController, decoration: const InputDecoration(labelText: "Associated Myths (comma-separated)")),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text("Cancel"),
            ),
            ElevatedButton(
              onPressed: () async {
                final Map<String, dynamic> newGod = {
                  "name": nameController.text,
                  "domain": domainController.text.split(',').map((e) => e.trim()).toList(),
                  "symbols": symbolsController.text.split(',').map((e) => e.trim()).toList(),
                  "parents": parentsController.text.split(',').map((e) => e.trim()).toList(),
                  "romanEquivalent": romanController.text,
                  "associatedMyths": mythsController.text.split(',').map((e) => e.trim()).toList(),
                };
                final response = await http.post(
                  Uri.parse('http://192.168.1.12:3000/api/gods'),
                  headers: {"Content-Type": "application/json"},
                  body: json.encode(newGod),
                );
                if (response.statusCode == 201) {
                  fetchGods();
                  Navigator.pop(context);
                }
              },
              child: const Text("Add"),
            ),
          ],
        );
      },
    );
  }

  void showDeleteDialog(Map god) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Delete ${god['name']}?"),
        content: const Text("Are you sure you want to delete this god?"),
        actions: [
          TextButton(
            child: const Text("Cancel"),
            onPressed: () => Navigator.pop(context),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            onPressed: () {
              Navigator.pop(context);
              deleteGod(god['_id']);
            },
            child: const Text("Delete"),
          ),
        ],
      ),
    );
  }

  void showDetailsPage(Map god) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => GodDetailsPage(god: god),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue.shade900.withOpacity(0.1),
      appBar: AppBar(
        title: const Text('Greek Gods'),
        backgroundColor: Colors.blue,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.only(top: 20.0),
        itemCount: gods.length,
        itemBuilder: (context, index) {
          final god = gods[index];
          return Card(
            color: Colors.blue.shade100.withOpacity(0.3),
            margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
            child: ListTile(
              title: Text(
                god['name'],
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              onTap: () => showDetailsPage(god),
              onLongPress: () => showDeleteDialog(god),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: showAddGodDialog,
        child: const Icon(Icons.add),
      ),
    );
  }
}

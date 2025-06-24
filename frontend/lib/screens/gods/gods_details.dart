import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class GodDetailsPage extends StatelessWidget {
  final Map god;
  const GodDetailsPage({super.key, required this.god});

  void showEditDialog(BuildContext context) {
  final nameController = TextEditingController(text: god['name']);
  final domainController = TextEditingController(text: (god['domain'] as List).join(', '));
  final symbolsController = TextEditingController(text: (god['symbols'] as List).join(', '));
  final parentsController = TextEditingController(text: (god['parents'] as List).join(', '));
  final romanController = TextEditingController(text: god['romanEquivalent'] ?? '');
  final mythsController = TextEditingController(text: (god['associatedMyths'] as List).join(', '));

  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text("Edit God"),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
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
            final updatedGod = {
              "name": nameController.text.trim(),
              "domain": domainController.text.split(',').map((e) => e.trim()).toList(),
              "symbols": symbolsController.text.split(',').map((e) => e.trim()).toList(),
              "parents": parentsController.text.split(',').map((e) => e.trim()).toList(),
              "romanEquivalent": romanController.text.trim(),
              "associatedMyths": mythsController.text.split(',').map((e) => e.trim()).toList(),
            };

            final response = await http.put(
              Uri.parse('http://192.168.1.12:3000/api/gods/${god['_id']}'),
              headers: {'Content-Type': 'application/json'},
              body: json.encode(updatedGod),
            );

            if (response.statusCode == 200) {
              Navigator.pop(context);
              Navigator.pop(context); // close the details page
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("God updated successfully")),
              );
            } else {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Failed to update god")),
              );
            }
          },
          child: const Text("Save"),
        ),
      ],
    ),
  );
}


  Widget _buildDetail(String title, dynamic value) {
    String displayValue = "N/A";

    if (value != null) {
      if (value is List) {
        if (value.isNotEmpty) {
          displayValue = value.where((item) => item != null && item.toString().trim().isNotEmpty).join(', ');
          if (displayValue.isEmpty) displayValue = "N/A";
        }
      } else if (value is String) {
        if (value.trim().isNotEmpty) {
          displayValue = value.trim();
        }
      } else {
        String strValue = value.toString().trim();
        if (strValue.isNotEmpty && strValue != 'null') {
          displayValue = strValue;
        }
      }
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "$title:",
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.blue),
          ),
          const SizedBox(height: 4),
          Text(displayValue, style: const TextStyle(fontSize: 14)),
          const Divider(color: Colors.grey),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(god['name']),
        backgroundColor: Colors.blue,
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () => showEditDialog(context),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDetail("Domain", god['domain']),
            _buildDetail("Symbols", god['symbols']),
            _buildDetail("Parents", god['parents']),
            _buildDetail("Roman Equivalent", god['romanEquivalent']),
            _buildDetail("Associated Myths", god['associatedMyths']),
          ],
        ),
      ),
    );
  }
}